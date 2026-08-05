# Requirements Traceability Matrix (RTM)

## 1. Overview
The Requirements Traceability Matrix (RTM) establishes bi-directional end-to-end traceability across all business requirements, system modules, UI screens, REST API endpoints, database tables, workflows, validation rules, automated test suites, and AI semantic entities within HEMP.

---

## 2. Master Traceability Matrix

| Req ID | Requirement Description | Module | UI Screen | API Endpoint | Database Table | Workflow State | Business Rule | Test Case | AI Semantic Entity |
|--------|-------------------------|--------|-----------|--------------|----------------|----------------|---------------|-----------|--------------------|
| `REQ-IAM-01` | OIDC/OAuth2 Multi-Factor Authentication | `identity` | `IAM-UI-01` | `POST /api/v1/auth/login` | `security.iam_user` | `ACTIVE` | `IAM-BR-01` | `TC-IAM-001` | `security.iam_user` |
| `REQ-IAM-02` | Automated 5-attempt Account Lockout | `identity` | `IAM-UI-01` | `POST /api/v1/auth/login` | `security.iam_user` | `LOCKED` | `IAM-BR-01` | `TC-IAM-002` | `security.iam_user` |
| `REQ-ORG-01` | Multi-Tier Org Hierarchy Modeling | `organization` | `ORG-UI-01` | `POST /api/v1/organizations` | `organization.org_unit` | `ACTIVE` | `ORG-BR-01` | `TC-ORG-001` | `organization.org_unit` |
| `REQ-PRV-01` | Practitioner Enrollment & NPI Validation | `provider` | `PRV-UI-01` | `POST /api/v1/providers/enroll` | `domain.provider_profile` | `SUBMITTED` | `PRV-BR-01` | `TC-PRV-001` | `healthcare.provider` |
| `REQ-PRV-02` | 36-Month Credentialing Revalidation | `provider` | `PRV-UI-01` | `PATCH /api/v1/providers/{id}/revalidate` | `provider.credentialing_case` | `IN_CREDENTIALING` | `PRV-BR-02` | `TC-PRV-002` | `healthcare.provider` |
| `REQ-MBR-01` | Real-Time EDI 270/271 Eligibility Query | `member` | `MBR-UI-01` | `POST /api/v1/members/eligibility/check` | `domain.member_eligibility` | `ACTIVE` | `MBR-BR-01` | `TC-MBR-001` | `healthcare.member` |
| `REQ-CLM-01` | EDI 837 Claim Intake & Timely Filing Check | `claims` | `CLM-UI-01` | `POST /api/v1/claims/intake` | `domain.claim_header` | `RECEIVED` | `CLM-BR-01` | `TC-CLM-001` | `healthcare.claim` |
| `REQ-CLM-02` | Clean Claim Auto-Adjudication & Pricing | `claims` | `CLM-UI-01` | `POST /api/v1/claims/intake` | `domain.claim_header` | `ADJUDICATED` | `CLM-BR-02` | `TC-CLM-002` | `healthcare.claim` |
| `REQ-AUTH-01` | Urgent Prior Auth 72-Hour SLA Review | `authorization` | `AUTH-UI-01` | `POST /api/v1/authorizations` | `domain.case_record` | `IN_CLINICAL_REVIEW` | `AUTH-BR-01` | `TC-AUTH-001` | `healthcare.prior_auth` |
| `REQ-TPL-01` | Commercial Primary Insurance Cost Avoidance | `tpl` | `TPL-UI-01` | `GET /api/v1/tpl/policies/{memberId}` | `tpl.other_insurance_policy` | `MATCH_IDENTIFIED` | `TPL-BR-01` | `TC-TPL-001` | `healthcare.tpl` |
| `REQ-FIN-01` | Weekly Claim Payment Batch & 835 Remittance | `finance` | `FIN-UI-01` | `POST /api/v1/finance/batches/{id}/release` | `finance.payment_batch` | `PAYMENT_RELEASED` | `FIN-BR-01` | `TC-FIN-001` | `healthcare.finance` |

---

## 3. Governance Verification
Every new feature PR MUST update the RTM table before merging.
