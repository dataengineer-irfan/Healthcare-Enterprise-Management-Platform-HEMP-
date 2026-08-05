-- =============================================================================
-- EHP-OS v3.0 Database DDL: 02_security.sql
-- RBAC, Permissions, and User Security Context Tables
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS security;

CREATE TABLE security.role (
    role_id VARCHAR(64) PRIMARY KEY,
    role_name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE security.permission (
    permission_id VARCHAR(128) PRIMARY KEY,
    domain VARCHAR(64) NOT NULL,
    action VARCHAR(64) NOT NULL,
    description TEXT
);

CREATE TABLE security.role_permission (
    role_id VARCHAR(64) REFERENCES security.role(role_id) ON DELETE CASCADE,
    permission_id VARCHAR(128) REFERENCES security.permission(permission_id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);
