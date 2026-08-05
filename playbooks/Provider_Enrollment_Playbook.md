# Operational Playbook: Provider Enrollment & Credentialing

## 1. Business Scenario
An individual physician applies to join the health plan provider network. The system validates NPPES NPI data, initiates credentialing verification, triggers state machine review, and issues active directory network status.

---

## 2. Preconditions & Requirements
- Provider possesses 10-digit NPI (`npi`) and valid state medical license.
- User possesses `healthcare:provider:enroll` RBAC permission.

---

## 3. Step-by-Step Execution Sequence

### Step 1: Portal Submission
- **UI Screen**: `PRV-UI-01` (Provider Enrollment Wizard)
- **API Invocation**: `POST /api/v1/providers/enroll`
- **Database Action**: `INSERT INTO domain.provider_profile` (`credentialing_status = 'PENDING'`)
- **Event Published**: `ProviderEnrolledEvent` (Kafka topic `hemp.provider.events`)

### Step 2: Automated Verification
- System executes NPPES API lookup `GET /nppes/v2.1/?number=1234567890`.
- System evaluates validation rules `PRV-R01` (NPI Checksum) and `PRV-R03` (License Expiry).

### Step 3: Credentialing Committee Review
- **Workflow State Machine**: `SUBMITTED -> IN_CREDENTIALING`
- **UI Screen**: `PRV-UI-02` (Credentialing Detail View)
- **API Invocation**: `PATCH /api/v1/providers/{id}/credential` (Action: `APPROVE`)
- **Database Action**: `UPDATE domain.provider_profile SET credentialing_status = 'APPROVED'`

### Step 4: Audit & AI Knowledge Graph Sync
- **Audit Entry Written**: `audit.audit_log` (`action_type = 'CREDENTIALING_APPROVED'`)
- **AI Knowledge Catalog Updated**: `ai.semantic_catalog` entry refreshed.

---

## 4. Failure Handling & Recovery
- **NPPES API Outage**: System triggers circuit breaker fallback, flagging case for manual NPI verification without failing the submission.
- **License Expired**: Application auto-rejects with `PRV-ERR-2002`, notifying applicant via email.
