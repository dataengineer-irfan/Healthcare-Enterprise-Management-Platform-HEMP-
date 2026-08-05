-- =============================================================================
-- EHP-OS v3.0 Database DDL: 07_provider.sql
-- Healthcare Provider Domain Tables
-- =============================================================================

CREATE TABLE domain.provider_profile (
    provider_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES domain.person(person_id),
    organization_id UUID REFERENCES domain.organization(organization_id),
    npi VARCHAR(10) NOT NULL UNIQUE,
    taxonomy_code VARCHAR(32) NOT NULL,
    license_number VARCHAR(64),
    credentialing_status VARCHAR(32) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
