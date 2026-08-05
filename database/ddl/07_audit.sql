-- =============================================================================
-- EHP-OS v3.0 Database DDL: 07_audit.sql
-- Partitioned Immutable Audit Log Schema
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS audit;

CREATE TABLE audit.audit_log (
    audit_id BIGSERIAL,
    trace_id VARCHAR(64),
    user_id VARCHAR(64) NOT NULL,
    action_type VARCHAR(32) NOT NULL, -- CREATE, UPDATE, DELETE, VIEW, EXECUTE
    entity_id VARCHAR(64) NOT NULL,
    record_id VARCHAR(128) NOT NULL,
    previous_state JSONB,
    new_state JSONB,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (audit_id, timestamp)
) PARTITION BY RANGE (timestamp);

-- Default Partition for Current Year
CREATE TABLE audit.audit_log_2026 PARTITION OF audit.audit_log
    FOR VALUES FROM ('2026-01-01 00:00:00+00') TO ('2027-01-01 00:00:00+00');
