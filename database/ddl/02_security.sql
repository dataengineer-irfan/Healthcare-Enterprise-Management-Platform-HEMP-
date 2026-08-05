-- =============================================================================
-- EHP-OS v3.0 Database DDL: 02_security.sql
-- Identity & Access Management (IAM) Full Table Definitions
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS security;

-- 1. IAM USER
CREATE TABLE security.iam_user (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    phone_number VARCHAR(32),
    authentication_source VARCHAR(64) NOT NULL DEFAULT 'OIDC', -- OIDC, OAUTH2, LDAP, SAML, LOCAL
    account_status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE', -- ACTIVE, LOCKED, DISABLED, SUSPENDED
    password_hash VARCHAR(255),
    password_last_changed TIMESTAMP WITH TIME ZONE,
    failed_login_count INTEGER NOT NULL DEFAULT 0,
    last_login_at TIMESTAMP WITH TIME ZONE,
    mfa_enabled BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_iam_user_username ON security.iam_user(username);
CREATE INDEX idx_iam_user_email ON security.iam_user(email);
CREATE INDEX idx_iam_user_status ON security.iam_user(account_status);

-- 2. IAM ROLE
CREATE TABLE security.iam_role (
    role_id VARCHAR(64) PRIMARY KEY,
    role_code VARCHAR(64) UNIQUE NOT NULL,
    role_name VARCHAR(128) NOT NULL,
    description TEXT,
    system_role BOOLEAN NOT NULL DEFAULT FALSE,
    active_flag BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. IAM PERMISSION
CREATE TABLE security.iam_permission (
    permission_id VARCHAR(128) PRIMARY KEY,
    permission_code VARCHAR(128) UNIQUE NOT NULL,
    domain VARCHAR(64) NOT NULL,
    action VARCHAR(64) NOT NULL,
    description TEXT
);

-- 4. IAM ROLE PERMISSION
CREATE TABLE security.iam_role_permission (
    role_id VARCHAR(64) REFERENCES security.iam_role(role_id) ON DELETE CASCADE,
    permission_id VARCHAR(128) REFERENCES security.iam_permission(permission_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 5. IAM USER ROLE
CREATE TABLE security.iam_user_role (
    user_id UUID REFERENCES security.iam_user(user_id) ON DELETE CASCADE,
    role_id VARCHAR(64) REFERENCES security.iam_role(role_id) ON DELETE CASCADE,
    effective_from TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    effective_to TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (user_id, role_id)
);

-- 6. IAM GROUP
CREATE TABLE security.iam_group (
    group_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_code VARCHAR(64) UNIQUE NOT NULL,
    group_name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. IAM SESSION
CREATE TABLE security.iam_session (
    session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES security.iam_user(user_id) ON DELETE CASCADE,
    ip_address VARCHAR(45) NOT NULL,
    device VARCHAR(128),
    browser VARCHAR(128),
    login_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiry_time TIMESTAMP WITH TIME ZONE NOT NULL,
    logout_time TIMESTAMP WITH TIME ZONE,
    revoked BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE INDEX idx_iam_session_user ON security.iam_session(user_id);

-- 8. IAM API CLIENT
CREATE TABLE security.iam_api_client (
    client_id VARCHAR(128) PRIMARY KEY,
    client_name VARCHAR(128) NOT NULL,
    client_secret_hash VARCHAR(255) NOT NULL,
    scopes TEXT[] NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
