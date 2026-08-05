# Identity & Access Management (IAM)

## Version 1.0

---

# Purpose

The Identity & Access Management (IAM) module provides authentication, authorization, user lifecycle management, organization hierarchy, and security services for the HEMP platform.

It is the foundational module upon which every other module depends.

---

# Business Objectives

The IAM module shall:

* Authenticate users securely.
* Authorize access using RBAC and permissions.
* Integrate with enterprise identity providers.
* Support internal and external users.
* Provide complete auditability.
* Support API authentication.
* Support AI authorization.
* Enable multi-organization deployments.

---

# Supported Authentication Methods

Priority order:

1. OpenID Connect (OIDC)
2. OAuth2
3. LDAP
4. SAML 2.0
5. Local Database Authentication (Development Only)

---

# User Types

* System Administrator
* Security Administrator
* Organization Administrator
* Provider Administrator
* Provider User
* Member User
* Claims Processor
* Finance User
* Report User
* Auditor
* AI Service Account
* API Client

---

# Core Entities

## iam_user

Stores application users.

Fields:

* user_id (UUID)
* username
* email
* first_name
* last_name
* phone_number
* authentication_source
* account_status
* password_hash (local only)
* password_last_changed
* failed_login_count
* last_login_at
* mfa_enabled
* created_at
* updated_at

Indexes:

* username
* email
* account_status

---

## iam_role

Fields:

* role_id
* role_code
* role_name
* description
* system_role
* active_flag

Examples:

SYSTEM_ADMIN  
PROVIDER_ADMIN  
CLAIMS_PROCESSOR  
FINANCE_USER  
REPORT_USER  

---

## iam_permission

Examples:

USER_VIEW  
USER_CREATE  
USER_UPDATE  
USER_DELETE  
PROVIDER_VIEW  
PROVIDER_EDIT  
CLAIM_APPROVE  
CLAIM_PAYMENT  
REPORT_EXPORT  

---

## iam_role_permission

Many-to-many relationship.

---

## iam_user_role

Assigns roles to users.

Supports effective dates.

---

## iam_group

Logical grouping.

Examples:

Finance  
Claims  
Provider Enrollment  
Security  

---

## iam_session

Tracks active sessions.

Fields:

* session_id
* user_id
* ip_address
* device
* browser
* login_time
* expiry_time
* logout_time
* revoked

---

## iam_api_client

Supports machine-to-machine authentication.

Fields:

* client_id
* client_secret_hash
* scopes
* status

---

# Organization Hierarchy

Supports unlimited hierarchy.

Enterprise  
↓  
Organization  
↓  
Department  
↓  
Team  
↓  
User  

Each node supports:

* effective dates
* status
* audit history

---

# Authentication Flow

1. User accesses login page.
2. Identity provider validates credentials.
3. IAM receives identity token.
4. User profile is synchronized if required.
5. Roles are loaded.
6. Permissions resolved.
7. JWT generated.
8. Session recorded.
9. Audit event written.
10. User redirected to dashboard.

---

# JWT Claims

Required claims:

* sub
* username
* organization_id
* roles
* permissions
* tenant_id
* session_id
* issued_at
* expiry

---

# Authorization Model

Every request passes through:

Authentication  
↓  
Permission Validation  
↓  
Organization Validation  
↓  
Workflow Validation (if applicable)  
↓  
Business Rule Validation  
↓  
Execution  

---

# UI Screens

1. Login
2. Forgot Password
3. Reset Password
4. Change Password
5. User Management
6. Role Management
7. Permission Management
8. Group Management
9. Session Monitoring
10. Organization Management
11. Audit Viewer
12. API Client Management

---

# REST API Examples

Authentication  
POST /api/v1/auth/login  
POST /api/v1/auth/logout  
POST /api/v1/auth/refresh  

User Management  
GET /api/v1/users  
GET /api/v1/users/{id}  
POST /api/v1/users  
PUT /api/v1/users/{id}  
DELETE /api/v1/users/{id}  

Role Management  
GET /api/v1/roles  
POST /api/v1/roles  

Permission Management  
GET /api/v1/permissions  

Organization  
GET /api/v1/organizations  
POST /api/v1/organizations  

---

# Audit Events

Record:

* Login Success
* Login Failure
* Password Change
* Password Reset
* MFA Enabled
* Role Assigned
* Role Removed
* Permission Changed
* Session Revoked
* User Created
* User Updated
* User Disabled

---

# Security Rules

* Password policy configurable.
* MFA optional per deployment.
* Account lockout after configurable failures.
* JWT expiration configurable.
* Refresh tokens rotatable.
* CSRF protection where applicable.
* HTTPS mandatory.
* Secrets never stored in plaintext.

---

# AI Integration

The AI layer authenticates through service accounts.

AI actions:

* Must include user context.
* Must enforce user permissions.
* Must never bypass authorization.
* Must write audit records for every action.

---

# Reporting

Standard reports:

* Active Users
* Disabled Users
* Role Assignment Matrix
* Permission Matrix
* Login Activity
* Failed Login Attempts
* Active Sessions
* API Client Usage

---

# Test Scenarios

Authentication:

* Valid login
* Invalid password
* Locked account
* Expired password
* Expired token
* Refresh token
* Logout

Authorization:

* User without permission
* User with permission
* Organization restriction
* Expired role assignment

Audit:

* Verify every security event is logged.
* Verify session creation and revocation.
* Verify AI actions are traceable.

---

# Future Enhancements

* Passwordless authentication
* Hardware security keys (FIDO2/WebAuthn)
* Risk-based authentication
* Adaptive access policies
* Delegated administration
* Fine-grained attribute-based access control (ABAC)

---

# Dependencies

This module depends on:

* Security Architecture
* Database Architecture
* API Standards
* Audit Framework

All business modules (Provider, Member, Claims, Finance, Reports, etc.) depend on IAM for authentication and authorization.
