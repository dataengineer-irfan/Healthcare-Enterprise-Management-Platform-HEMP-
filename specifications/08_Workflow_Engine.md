# 08_Workflow_Engine.md — Workflow Engine Architecture Specification

## 1. Purpose
This document specifies the declarative state machine workflow engine runtime, transition hooks, task assignments, SLA escalations, and approval routing across HEMP.

---

## 2. Scope
Applies to all business process flows including Provider Enrollment, Member Eligibility Review, Prior Authorization Approvals, Claims Adjudication Disputes, and TPL Review Cases.

---

## 3. Objectives
- Provide a centralized state machine engine (`kernel.workflow_instance`) executing metadata-defined state transitions.
- Standardize state transitions: `Draft -> Submit -> Review -> Approve -> Reject -> Escalate -> Cancel -> Complete`.
- Support automatic task generation and SLA deadline monitoring.

---

## 4. Workflow Lifecycle & State Machine Architecture

```
         ┌───────┐
         │ Draft │
         └───┬───┘
             │ Submit
             ▼
        ┌─────────┐   Escalate   ┌───────────┐
        │ Review  ├─────────────►│ Escalated │
        └─┬───┬───┘              └─────┬─────┘
          │   │                        │ Resolve
  Approve │   │ Reject                 │
          ▼   ▼                        │
    ┌──────────┐ ┌──────────┐          │
    │ Approved │ │ Rejected │◄─────────┘
    └──────────┘ └──────────┘
```

---

## 5. Metadata Schema & Engine Contracts

### 5.1 Workflow Definition Schema (`metadata/workflows/provider_enrollment_wf.json`)
```json
{
  "workflowId": "wf.provider_enrollment",
  "entityId": "healthcare.provider",
  "initialState": "DRAFT",
  "states": ["DRAFT", "SUBMITTED", "IN_CREDENTIALING", "APPROVED", "REJECTED"],
  "transitions": [
    {
      "from": "DRAFT",
      "to": "SUBMITTED",
      "action": "SUBMIT",
      "requiredRole": "ProviderApplicant",
      "rules": ["rule.npi_required", "rule.license_valid"]
    },
    {
      "from": "SUBMITTED",
      "to": "IN_CREDENTIALING",
      "action": "START_REVIEW",
      "requiredRole": "CredentialingSpecialist"
    }
  ]
}
```

---

## 6. Dependencies
- **PostgreSQL**: `kernel.workflow_definition` & `kernel.workflow_instance`.
- **Redis**: Distributed lock management for concurrent state transitions.

---

## 7. Security Considerations
- Workflow transitions check `requiredRole` and `permission` against the actor's security context before execution.

---

## 8. AI Considerations
- The **Workflow Assistant** inspects active `workflow_instance` rows to suggest recommended next actions and auto-flag SLA breach risks.

---

## 9. Future Enhancements
- Visual BPMN 2.0 diagram import and export support.

---

## 10. Cross References
- [01_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/01_Architecture.md)
- [07_Metadata_Model.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/07_Metadata_Model.md)

---

## 11. Version History
- **v1.0.0** (2026-08-05): Initial release of Workflow Engine Specification.
