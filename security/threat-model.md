# STRIDE Security Threat Model Specification

## 1. Overview
This document specifies the STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) threat model evaluation for HEMP.

---

## 2. STRIDE Threat Matrix

| Threat Category | Risk Description | Mitigation Control | Verification Test |
|-----------------|------------------|--------------------|-------------------|
| **Spoofing Identity** | Attacker impersonates legitimate clinical provider | Mandatory OIDC/OAuth2 MFA and mTLS service identity | `TC-SEC-001` |
| **Tampering Data** | Unapproved modification of claim pricing dollars | SHA-256 database row checksums and optimistic locking | `TC-SEC-002` |
| **Repudiation** | User denies authorizing a prior auth approval | Immutable `audit.audit_log` with digital signature | `TC-SEC-003` |
| **Information Disclosure** | Unauthorized exposure of PHI/PII data | AES-256 column-level encryption and row-level security (RLS) | `TC-SEC-004` |
| **Denial of Service** | API flooding overloading claim intake gateway | Rate limiting (100 req/min/IP) and Redis token bucket | `TC-SEC-005` |
| **Elevation of Privilege** | Normal member user invoking admin endpoints | OAuth2 JWT scope validation and PDP permission check | `TC-SEC-006` |
