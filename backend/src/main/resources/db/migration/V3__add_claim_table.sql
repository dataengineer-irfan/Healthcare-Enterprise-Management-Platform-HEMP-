-- =============================================================================
-- HEMP Demo Edition Database Schema (V3__add_claim_table.sql)
-- =============================================================================

CREATE TABLE IF NOT EXISTS claim (
    claim_id VARCHAR(36) PRIMARY KEY,
    claim_number VARCHAR(32) NOT NULL UNIQUE,
    provider_id VARCHAR(36) NOT NULL REFERENCES provider(provider_id),
    member_id VARCHAR(36) NOT NULL REFERENCES member(member_id),
    claim_date DATE NOT NULL,
    service_date DATE NOT NULL,
    billed_amount NUMERIC(12, 2) NOT NULL,
    approved_amount NUMERIC(12, 2) DEFAULT 0.00,
    status VARCHAR(32) NOT NULL DEFAULT 'SUBMITTED', -- SUBMITTED, APPROVED, REJECTED, PENDING
    diagnosis_code VARCHAR(16) NOT NULL,
    procedure_code VARCHAR(16) NOT NULL,
    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
