-- =============================================================================
-- EHP-OS v3.0 Database DDL: 09_claims.sql
-- Healthcare Claims Intake, Pricing, and Processing Tables
-- =============================================================================

CREATE TABLE domain.claim_header (
    claim_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_number VARCHAR(64) UNIQUE NOT NULL,
    provider_id UUID NOT NULL REFERENCES domain.provider_profile(provider_id),
    member_id UUID NOT NULL REFERENCES domain.member_eligibility(member_id),
    total_billed_amount NUMERIC(12, 2) NOT NULL,
    total_paid_amount NUMERIC(12, 2) DEFAULT 0.00,
    claim_status VARCHAR(32) DEFAULT 'RECEIVED', -- RECEIVED, ADJUDICATED, PAID, DENIED
    service_start_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
