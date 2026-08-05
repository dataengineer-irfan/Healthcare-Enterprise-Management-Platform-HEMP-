# Provider Enrollment — Complete Reference Implementation Example

This document demonstrates an end-to-end metadata-driven implementation for **Provider Enrollment**, serving as the template for all subsequent business module developments.

---

## 1. Business Requirements
- Individual healthcare practitioners must enroll by providing personal demographics, 10-digit NPI, medical taxonomy code, and state license number.
- Submissions transition through state machine: `DRAFT -> SUBMITTED -> IN_CREDENTIALING -> APPROVED / REJECTED`.

---

## 2. Metadata Definition (`metadata/entities/provider.json`)
```json
{
  "entityId": "healthcare.provider",
  "entityName": "Provider",
  "domain": "healthcare",
  "tableName": "provider_profile",
  "fields": [
    { "fieldName": "npi", "displayLabel": "NPI", "dataType": "string", "isRequired": true },
    { "fieldName": "taxonomy_code", "displayLabel": "Taxonomy Code", "dataType": "string", "isRequired": true }
  ]
}
```

---

## 3. Database DDL (`database/ddl/07_provider.sql`)
```sql
CREATE TABLE domain.provider_profile (
    provider_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    npi VARCHAR(10) NOT NULL UNIQUE,
    taxonomy_code VARCHAR(32) NOT NULL,
    credentialing_status VARCHAR(32) DEFAULT 'PENDING'
);
```

---

## 4. API Contract (`api/openapi/provider.yaml`)
```yaml
/api/v1/providers/enroll:
  post:
    summary: Submit new provider enrollment application
    requestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/ProviderEnrollmentPayload'
    responses:
      '201':
        description: Created successfully
```

---

## 5. Workflow State Machine (`metadata/workflows/provider_enrollment_wf.json`)
- Transitions `DRAFT` to `SUBMITTED` upon validating `npi` and `taxonomy_code`.

---

## 6. End-to-End Test Plan
- Run automated POST request to `/api/v1/providers/enroll`.
- Verify row creation in `domain.provider_profile` and `audit.audit_log`.
- Verify Knowledge Brain semantic catalog query: `"Show active providers awaiting credentialing"`.
