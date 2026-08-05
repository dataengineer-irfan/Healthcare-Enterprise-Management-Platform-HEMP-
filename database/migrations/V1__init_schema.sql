-- =============================================================================
-- HEMP Demo Edition Database Schema (V1__init_schema.sql)
-- =============================================================================

CREATE TABLE IF NOT EXISTS provider (
    provider_id VARCHAR(36) PRIMARY KEY,
    npi VARCHAR(10) NOT NULL UNIQUE,
    provider_name VARCHAR(128) NOT NULL,
    taxonomy_code VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    phone VARCHAR(32),
    email VARCHAR(128),
    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS member (
    member_id VARCHAR(36) PRIMARY KEY,
    member_number VARCHAR(32) NOT NULL UNIQUE,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(16) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    phone VARCHAR(32),
    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS app_user (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    password_hash VARCHAR(128) NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    role VARCHAR(32) NOT NULL,
    created_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
