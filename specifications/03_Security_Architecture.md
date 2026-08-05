# 03_Security_Architecture.md — Enterprise Security Architecture Specification

## 1. Purpose
This document specifies the end-to-end security architecture for HEMP, governing authentication, single sign-on (SSO), OAuth2/OIDC, JSON Web Tokens (JWT), Role/Attribute-Based Access Control (RBAC/ABAC), data encryption, API security, AI authorization boundaries, and security monitoring.

---

## 2. Scope
Applies to all identity providers, user sessions, REST/gRPC API endpoints, background jobs, database access layers, and AI assistant tool executions.

---

## 3. Objectives
- Guarantee zero-trust security across all platform layers.
- Seamlessly integrate with enterprise Identity Providers (Active Directory / LDAP, Keycloak, Okta, Azure AD) via SAML 2.0 / OpenID Connect (OIDC).
- Enforce granular RBAC and ABAC policies down to field-level and row-level data access.
- Secure AI interaction channels to prevent prompt injection and unauthorized data access.

---

## 4. Design Principles
1. **Zero-Trust Network Architecture**: Every incoming request must be authenticated and authorized regardless of network provenance.
2. **Principle of Least Privilege**: Grant users and services only the minimum permissions required to perform their functions.
3. **Defense in Depth**: Secure application code, API gateways, database connections, and storage layers independently.
4. **Complete Auditability**: Log all authentication attempts, privilege escalation events, data access, and AI interactions.

---

## 5. Security & Authentication Flow

```
┌───────────────┐     1. Redirect to SSO     ┌────────────────────────┐
│ User Browser  ├───────────────────────────►│ OIDC IdP (Keycloak /   │
└───────┬───────┘                            │ Okta / Azure AD)       │
        │ 2. Issues Auth Code & Token        └────────────────────────┘
        ▼
┌───────────────┐     3. Bearer Token API    ┌────────────────────────┐
│  API Gateway  ├───────────────────────────►│ JWT Validation &       │
└───────┬───────┘                            │ Policy Decision Point  │
        │ 4. Forward Authorized Principal    └────────────────────────┘
        ▼
┌───────────────┐                            ┌────────────────────────┐
│ Service Layer ├───────────────────────────►│ Row-Level / Field-Level│
└───────────────┘                            │ RBAC Enforcement       │
                                             └────────────────────────┘
```

---

## 6. Security Components & Frameworks

### 6.1 Authentication & Identity Protocols
- **Protocols**: OAuth 2.0 + OpenID Connect (OIDC).
- **MFA (Multi-Factor Authentication)**: Mandatory TOTP / WebAuthn for administrative and clinical access.
- **JWT Architecture**: Short-lived access tokens (15 minutes), long-lived HTTP-only refresh tokens (8 hours).

### 6.2 Granular Authorization Model (RBAC / ABAC)
Permissions are structured hierarchically:
- `Role`: e.g. `ProviderEnrollmentSpecialist`, `ClaimsAdjudicator`, `SystemAdmin`.
- `Permission`: `<domain>:<entity>:<action>` (e.g. `healthcare:provider:create`, `claims:claim:adjudicate`).
- `Attribute Constraints`: e.g., `user.state == record.state` or `record.amount < $10,000`.

### 6.3 AI Authorization & Guardrails
- AI Assistants operate under the **Security Context** of the authenticated requesting user.
- Prompts are sanitized to prevent direct prompt injection.
- LLM outputs pass through safety guardrails before rendering in the UI.

---

## 7. Dependencies
- **Identity Provider (IdP)**: Keycloak / Okta / Azure AD.
- **Secrets Manager**: HashiCorp Vault / AWS Secrets Manager.
- **Crypto Library**: OpenSSL / Web Crypto API (AES-256-GCM, RSA-4096).

---

## 8. Security Considerations
- Data at rest encrypted using AES-256.
- Data in transit encrypted using TLS 1.3.
- Key rotation policy enforced every 90 days.

---

## 9. AI Considerations
- AI Assistants CANNOT bypass RBAC/ABAC rules. Query tools check user authorization before returning data to the AI model.

---

## 10. Future Enhancements
- Integration of biometrics / FIDO2 security keys for high-privilege transaction approvals.
- Dynamic automated threat detection using real-time API anomaly scoring.

---

## 11. Cross References
- [00_Project_Context.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/00_Project_Context.md)
- [01_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/01_Architecture.md)
- [04_AI_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/04_AI_Architecture.md)

---

## 12. Version History
- **v1.0.0** (2026-08-05): Initial release of Enterprise Security Architecture Specification.
