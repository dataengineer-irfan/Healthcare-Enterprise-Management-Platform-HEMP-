# Operational Playbook: Electronic 837 Claim Submission & Auto-Adjudication

## 1. Business Scenario
A clearinghouse submits a batch of electronic 837P claims. The platform performs format validation, eligibility verification, CCI edit checks, fee schedule pricing, and clean claim auto-adjudication.

---

## 2. Preconditions
- Submitting entity authenticated via OAuth2 (`healthcare:claims:submit`).
- Header includes `Idempotency-Key` and `X-Correlation-ID`.

---

## 3. Step-by-Step Execution Sequence

### Step 1: Intake & Duplicate Check
- **API Invocation**: `POST /api/v1/claims/intake`
- System evaluates `Idempotency-Key` in Redis L2 cache.
- System checks `domain.claim_header` for duplicate claim number.

### Step 2: Timely Filing & Eligibility Check
- System checks `CLM-BR-01` (Service date within 365 days).
- System queries member eligibility `domain.member_eligibility`.

### Step 3: Pricing & Auto-Adjudication
- Database function `domain.fn_adjudicate_claim(claimId)` executes.
- **Workflow State Machine**: `RECEIVED -> PRICED -> ADJUDICATED`
- **Event Published**: `ClaimAdjudicatedEvent`

### Step 4: Audit & Remittance Queue
- Audit log entry `CLAIM_ADJUDICATED` written.
- Claim added to pending 835 remittance queue.

---

## 4. Failure Handling
- **Timely Filing Exceeded**: Claim denies with `CLM-ERR-4002`, issuing rejection remittance.
