-- =============================================================================
-- EHP-OS v3.0 Database DDL: 06_ai.sql
-- Knowledge Brain Semantic Catalog & Prompt Registry Tables
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS ai;

CREATE TABLE ai.semantic_catalog (
    catalog_id VARCHAR(64) PRIMARY KEY,
    entity_id VARCHAR(64) NOT NULL REFERENCES metadata.entity_definition(entity_id),
    business_definition TEXT NOT NULL,
    synonyms TEXT[],
    search_keywords TEXT[],
    example_nl_queries TEXT[],
    allowed_operations TEXT[] DEFAULT ARRAY['SELECT'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
