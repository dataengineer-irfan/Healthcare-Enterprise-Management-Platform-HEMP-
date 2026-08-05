-- =============================================================================
-- EHP-OS v3.0 Database DDL: 18_tpl.sql
-- Third Party Liability & Coordination of Benefits Schema
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS tpl;

CREATE TABLE tpl.other_insurance_policy (
    policy_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id UUID NOT NULL REFERENCES domain.member_eligibility(member_id),
    carrier_name VARCHAR(128) NOT NULL,
    policy_number VARCHAR(64) NOT NULL,
    group_number VARCHAR(64),
    effective_date DATE NOT NULL,
    termination_date DATE,
    coverage_type VARCHAR(32) DEFAULT 'COMMERCIAL_PRIMARY',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
