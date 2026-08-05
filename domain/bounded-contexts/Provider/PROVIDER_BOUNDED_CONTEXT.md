# Provider Management — Bounded Context Specification (DDD)

## 1. Domain Overview
The Provider Bounded Context models practitioner credentials, facility network enrollments, specialty taxonomy classifications, and 36-month revalidation cycles.

---

## 2. Aggregates & Entities

```
┌───────────────────────────────────────────────────────────────────────────┐
│ Provider Aggregate Root                                                   │
│  ├── ProviderId (Value Object)                                            │
│  ├── Npi (Value Object - 10 Digits)                                       │
│  ├── TaxonomyCode (Value Object)                                          │
│  ├── CredentialingStatus (State Enum)                                     │
│  └── Entities:                                                            │
│       ├── License (Entity - State, Number, ExpiryDate)                     │
│       └── PracticeLocation (Entity - Address, Phone)                      │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Domain Events
- `ProviderEnrolledEvent`: Published when a provider successfully submits an enrollment application.
- `ProviderCredentialedEvent`: Published when Credentialing Committee approves a provider profile.
- `ProviderRevalidationDueEvent`: Published when 36-month revalidation SLA threshold is reached.

---

## 4. Invariants & Business Policies
- **Invariant 1**: A provider CANNOT be approved without at least 1 verified active state medical license.
- **Invariant 2**: NPI MUST be unique across all active provider aggregate roots.
