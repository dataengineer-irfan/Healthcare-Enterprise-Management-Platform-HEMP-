-- =============================================================================
-- Enterprise Healthcare Platform Operating System (EHP-OS) v3.0
-- Platform Kernel PostgreSQL DDL (v1.0)
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS kernel;
CREATE SCHEMA IF NOT EXISTS metadata;
CREATE SCHEMA IF NOT EXISTS audit;
CREATE SCHEMA IF NOT EXISTS ai;

-- -----------------------------------------------------------------------------
-- 1. ENTITY METADATA REGISTRY
-- -----------------------------------------------------------------------------
CREATE TABLE metadata.entity_definition (
    entity_id VARCHAR(64) PRIMARY KEY,
    entity_name VARCHAR(128) NOT NULL,
    display_name VARCHAR(128) NOT NULL,
    domain VARCHAR(64) NOT NULL, -- e.g. 'kernel', 'provider', 'member', 'claims'
    table_name VARCHAR(128) NOT NULL,
    schema_name VARCHAR(64) NOT NULL DEFAULT 'public',
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE metadata.field_definition (
    field_id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL REFERENCES metadata.entity_definition(entity_id) ON DELETE CASCADE,
    field_name VARCHAR(128) NOT NULL,
    display_label VARCHAR(128) NOT NULL,
    data_type VARCHAR(64) NOT NULL, -- e.g., 'string', 'number', 'boolean', 'date', 'uuid', 'jsonb'
    is_required BOOLEAN NOT NULL DEFAULT FALSE,
    is_unique BOOLEAN NOT NULL DEFAULT FALSE,
    is_searchable BOOLEAN NOT NULL DEFAULT TRUE,
    default_value TEXT,
    validation_regex TEXT,
    ui_component VARCHAR(64) DEFAULT 'text_input',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. WORKFLOW ENGINE SCHEMA
-- -----------------------------------------------------------------------------
CREATE TABLE kernel.workflow_definition (
    workflow_id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL REFERENCES metadata.entity_definition(entity_id),
    workflow_name VARCHAR(128) NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    definition_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE kernel.workflow_instance (
    instance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id VARCHAR(64) NOT NULL REFERENCES kernel.workflow_definition(workflow_id),
    target_entity_id VARCHAR(64) NOT NULL,
    target_record_id VARCHAR(128) NOT NULL,
    current_state VARCHAR(64) NOT NULL,
    assigned_to_user_id VARCHAR(64),
    status VARCHAR(32) NOT NULL DEFAULT 'IN_PROGRESS', -- IN_PROGRESS, COMPLETED, CANCELLED, REJECTED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 3. RULES ENGINE SCHEMA
-- -----------------------------------------------------------------------------
CREATE TABLE kernel.business_rule (
    rule_id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL REFERENCES metadata.entity_definition(entity_id),
    rule_name VARCHAR(128) NOT NULL,
    rule_type VARCHAR(64) NOT NULL, -- 'VALIDATION', 'CALCULATION', 'ROUTING'
    condition_expression TEXT NOT NULL,
    action_expression TEXT NOT NULL,
    error_message TEXT,
    priority INTEGER NOT NULL DEFAULT 100,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------------------------------
-- 4. DOCUMENT ENGINE SCHEMA
-- -----------------------------------------------------------------------------
CREATE TABLE kernel.document_attachment (
    document_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id VARCHAR(64) NOT NULL,
    record_id VARCHAR(128) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(128) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    checksum_sha256 VARCHAR(64),
    uploaded_by VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 5. AUDIT ENGINE SCHEMA
-- -----------------------------------------------------------------------------
CREATE TABLE audit.audit_log (
    audit_id BIGSERIAL PRIMARY KEY,
    trace_id VARCHAR(64),
    user_id VARCHAR(64) NOT NULL,
    action_type VARCHAR(32) NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'VIEW', 'EXECUTE'
    entity_id VARCHAR(64) NOT NULL,
    record_id VARCHAR(128) NOT NULL,
    previous_state JSONB,
    new_state JSONB,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_log_entity_record ON audit.audit_log(entity_id, record_id);
CREATE INDEX idx_audit_log_timestamp ON audit.audit_log(timestamp);

-- -----------------------------------------------------------------------------
-- 6. AI BRAIN & SEMANTIC CATALOG METADATA SCHEMA
-- -----------------------------------------------------------------------------
CREATE TABLE ai.semantic_catalog (
    catalog_id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL REFERENCES metadata.entity_definition(entity_id),
    business_definition TEXT NOT NULL,
    synonyms TEXT[], -- e.g. ARRAY['Doctor', 'Physician', 'Clinician']
    search_keywords TEXT[],
    example_nl_queries TEXT[], -- e.g. ARRAY['Show all active providers awaiting credentialing']
    allowed_operations TEXT[] DEFAULT ARRAY['SELECT'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai.prompt_template (
    prompt_id VARCHAR(64) PRIMARY KEY,
    prompt_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL, -- 'TEXT2SQL', 'RAG_SUMMARY', 'WORKFLOW_RECOMMENDER'
    template_text TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);
