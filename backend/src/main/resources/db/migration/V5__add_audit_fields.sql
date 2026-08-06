-- =============================================================================
-- HEMP Demo Edition Database Schema (V5__add_audit_fields.sql)
-- Adds Enterprise Audit Trail Columns across core tables
-- =============================================================================

ALTER TABLE provider 
ADD COLUMN IF NOT EXISTS created_by VARCHAR(64) DEFAULT 'SYSTEM',
ADD COLUMN IF NOT EXISTS updated_by VARCHAR(64) DEFAULT 'SYSTEM',
ADD COLUMN IF NOT EXISTS updated_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE member 
ADD COLUMN IF NOT EXISTS created_by VARCHAR(64) DEFAULT 'SYSTEM',
ADD COLUMN IF NOT EXISTS updated_by VARCHAR(64) DEFAULT 'SYSTEM',
ADD COLUMN IF NOT EXISTS updated_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE claim 
ADD COLUMN IF NOT EXISTS created_by VARCHAR(64) DEFAULT 'SYSTEM',
ADD COLUMN IF NOT EXISTS updated_by VARCHAR(64) DEFAULT 'SYSTEM',
ADD COLUMN IF NOT EXISTS updated_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;
