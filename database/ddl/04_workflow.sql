-- =============================================================================
-- EHP-OS v3.0 Database DDL: 04_workflow.sql
-- State Machine Workflows & Task Execution Tables
-- =============================================================================

CREATE TABLE IF NOT EXISTS kernel.workflow_definition (
    workflow_id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL REFERENCES metadata.entity_definition(entity_id),
    workflow_name VARCHAR(128) NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    definition_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS kernel.workflow_instance (
    instance_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id VARCHAR(64) NOT NULL REFERENCES kernel.workflow_definition(workflow_id),
    target_entity_id VARCHAR(64) NOT NULL,
    target_record_id VARCHAR(128) NOT NULL,
    current_state VARCHAR(64) NOT NULL,
    assigned_to_user_id VARCHAR(64),
    status VARCHAR(32) NOT NULL DEFAULT 'IN_PROGRESS',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
