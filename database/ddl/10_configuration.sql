-- =============================================================================
-- EHP-OS v3.0 Database DDL: 10_configuration.sql
-- Platform System Configuration & Runtime Parameters Schema
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS configuration;

CREATE TABLE configuration.system_parameter (
    param_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    param_key VARCHAR(128) UNIQUE NOT NULL,
    param_value TEXT NOT NULL,
    data_type VARCHAR(32) DEFAULT 'STRING',
    description TEXT,
    is_encrypted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
