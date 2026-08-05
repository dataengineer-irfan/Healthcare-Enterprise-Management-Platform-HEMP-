-- =============================================================================
-- EHP-OS v3.0 Database DDL: 01_kernel.sql
-- Core Platform Kernel Schema & Runtime Engine Tables
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS kernel;

CREATE TABLE kernel.system_parameter (
    param_key VARCHAR(128) PRIMARY KEY,
    param_value TEXT NOT NULL,
    description TEXT,
    is_encrypted BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
