-- =============================================================================
-- EHP-OS v3.0 Database DDL: 05_domain_framework.sql
-- Person, Organization, Address, Case, and Task Primitives
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS domain;

CREATE TABLE domain.person (
    person_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    date_of_birth DATE,
    primary_email VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE domain.organization (
    organization_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legal_name VARCHAR(255) NOT NULL,
    npi VARCHAR(10),
    organization_type VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
