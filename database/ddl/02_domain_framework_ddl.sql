-- =============================================================================
-- Enterprise Healthcare Platform Operating System (EHP-OS) v3.0
-- Layer 2: Generic Domain Framework DDL (v1.0)
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS domain;

-- -----------------------------------------------------------------------------
-- 1. PERSON ENTITY (Base for Members, Providers, Users, Contacts)
-- -----------------------------------------------------------------------------
CREATE TABLE domain.person (
    person_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(64) NOT NULL,
    middle_name VARCHAR(64),
    last_name VARCHAR(64) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(32),
    ssn_last_four VARCHAR(4),
    primary_email VARCHAR(128),
    primary_phone VARCHAR(32),
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 2. ORGANIZATION ENTITY (Base for Facilities, Payers, Vendors, Employers)
-- -----------------------------------------------------------------------------
CREATE TABLE domain.organization (
    organization_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legal_name VARCHAR(255) NOT NULL,
    dba_name VARCHAR(255),
    tax_id VARCHAR(32),
    npi VARCHAR(10),
    organization_type VARCHAR(64) NOT NULL, -- e.g., 'FACILITY', 'PAYER', 'GROUP_PRACTICE'
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 3. ADDRESS ENTITY
-- -----------------------------------------------------------------------------
CREATE TABLE domain.address (
    address_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(64) NOT NULL, -- e.g. 'PERSON', 'ORGANIZATION'
    entity_id UUID NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(128) NOT NULL,
    state VARCHAR(64) NOT NULL,
    postal_code VARCHAR(32) NOT NULL,
    country VARCHAR(64) NOT NULL DEFAULT 'USA',
    address_type VARCHAR(32) DEFAULT 'PHYSICAL', -- PHYSICAL, MAILING, BILLING
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 4. CASE MANAGEMENT & TASK ASSIGNMENT
-- -----------------------------------------------------------------------------
CREATE TABLE domain.case_record (
    case_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_number VARCHAR(64) UNIQUE NOT NULL,
    case_type VARCHAR(64) NOT NULL, -- e.g. 'PROVIDER_ENROLLMENT', 'PRIOR_AUTH', 'GRIEVANCE'
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(32) DEFAULT 'MEDIUM', -- LOW, MEDIUM, HIGH, URGENT
    status VARCHAR(32) DEFAULT 'OPEN',
    assigned_user_id VARCHAR(64),
    assigned_group_id VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE domain.task_item (
    task_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES domain.case_record(case_id) ON DELETE CASCADE,
    task_name VARCHAR(255) NOT NULL,
    task_type VARCHAR(64) NOT NULL, -- e.g., 'DOCUMENT_VERIFICATION', 'CREDENTIALING_REVIEW'
    due_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(32) DEFAULT 'PENDING', -- PENDING, IN_PROGRESS, COMPLETED, CANCELLED
    assigned_to VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
