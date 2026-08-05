-- =============================================================================
-- EHP-OS v3.0 Database DDL: 03_metadata.sql
-- Entity Metadata & Form/Grid Layout Definition Tables
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS metadata;

CREATE TABLE metadata.entity_definition (
    entity_id VARCHAR(64) PRIMARY KEY,
    entity_name VARCHAR(128) NOT NULL,
    display_name VARCHAR(128) NOT NULL,
    domain VARCHAR(64) NOT NULL,
    table_name VARCHAR(128) NOT NULL,
    schema_name VARCHAR(64) NOT NULL DEFAULT 'domain',
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
