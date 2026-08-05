# Claims Management — Bounded Context Specification (DDD)

## 1. Domain Overview
The Claims Bounded Context handles electronic 837 claim intake, timely filing checks, pricing calculation, duplicate detection, and adjudication decisions.

---

## 2. Aggregates & Entities

```
┌───────────────────────────────────────────────────────────────────────────┐
│ Claim Aggregate Root                                                      │
│  ├── ClaimId (Value Object)                                               │
│  ├── ClaimNumber (Value Object)                                           │
│  ├── TotalBilledAmount (Money Value Object)                               │
│  ├── TotalPaidAmount (Money Value Object)                                 │
│  └── Entities:                                                            │
│       ├── ClaimLineItem (Entity - CPT Code, Charge, ServiceDate)          │
│       └── DiagnosisCode (Value Object - ICD-10)                          │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Domain Events
- `ClaimSubmittedEvent`: Published when a 837 claim intake payload is validated.
- `ClaimAdjudicatedEvent`: Published when pricing and adjudication edits complete.
- `ClaimDeniedEvent`: Published when claim fails timely filing or eligibility rules.
