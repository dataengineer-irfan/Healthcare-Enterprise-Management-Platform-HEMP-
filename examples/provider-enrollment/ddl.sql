-- Provider Enrollment Vertical Slice DDL
CREATE TABLE IF NOT EXISTS domain.provider_profile (
    provider_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    npi VARCHAR(10) NOT NULL UNIQUE,
    taxonomy_code VARCHAR(32) NOT NULL,
    credentialing_status VARCHAR(32) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
