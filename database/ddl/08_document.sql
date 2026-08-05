-- =============================================================================
-- EHP-OS v3.0 Database DDL: 08_document.sql
-- Multi-Tenant Document Storage & Checksum Metadata Schema
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS document;

CREATE TABLE document.attachment (
    document_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id VARCHAR(64) NOT NULL,
    record_id VARCHAR(128) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(128) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    storage_path TEXT NOT NULL,
    checksum_sha256 VARCHAR(64) NOT NULL,
    scan_status VARCHAR(32) DEFAULT 'CLEAN',
    uploaded_by VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
