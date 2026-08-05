-- =============================================================================
-- EHP-OS v3.0 Database DDL: 08_member.sql
-- Healthcare Member Eligibility & Benefits Domain Tables
-- =============================================================================

CREATE TABLE domain.member_eligibility (
    member_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES domain.person(person_id),
    subscriber_number VARCHAR(64) NOT NULL,
    benefit_plan_id VARCHAR(64) NOT NULL,
    effective_date DATE NOT NULL,
    termination_date DATE,
    coverage_status VARCHAR(32) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
