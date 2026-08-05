-- =============================================================================
-- EHP-OS v3.0 Database DDL: 19_finance.sql
-- Financial Ledgers, Payment Batches, and Remittance Schema
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS finance;

CREATE TABLE finance.payment_batch (
    batch_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_number VARCHAR(64) UNIQUE NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL,
    claim_count INTEGER NOT NULL,
    status VARCHAR(32) DEFAULT 'CREATED', -- CREATED, RELEASED, REMITTED
    created_by VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
