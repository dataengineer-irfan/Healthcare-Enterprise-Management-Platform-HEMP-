-- =============================================================================
-- EHP-OS v3.0 Database DDL: 06_rules.sql
-- Declarative Business Rules & Decision Tables Schema
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS rules;

CREATE TABLE rules.business_rule (
    rule_id VARCHAR(64) PRIMARY KEY,
    rule_name VARCHAR(128) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    rule_type VARCHAR(64) NOT NULL, -- VALIDATION, PRICING, ROUTING
    condition_expression TEXT NOT NULL,
    action_expression TEXT NOT NULL,
    error_message TEXT,
    priority INTEGER NOT NULL DEFAULT 100,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
