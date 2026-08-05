-- =============================================================================
-- EHP-OS v3.0 Database DDL: 03_organization.sql
-- Unlimited Multi-Tier Organization Hierarchy Schema
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS organization;

CREATE TABLE organization.org_unit (
    org_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_org_id UUID REFERENCES organization.org_unit(org_id),
    org_code VARCHAR(64) UNIQUE NOT NULL,
    org_name VARCHAR(255) NOT NULL,
    org_type VARCHAR(64) NOT NULL, -- ENTERPRISE, REGION, DIVISION, DEPARTMENT, TEAM
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    effective_from DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_to DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_org_unit_parent ON organization.org_unit(parent_org_id);
