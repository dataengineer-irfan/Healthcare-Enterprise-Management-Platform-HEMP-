# Canonical Data Model (CDM) Specification

## 1. Executive Summary
The Canonical Data Model (CDM) serves as the single authoritative domain abstraction across HEMP. All UI components, REST APIs, database schemas, message broker events, FHIR mappings, EDI X12 converters, and AI semantic catalogs derive their structure from these canonical entity definitions.

---

## 2. Canonical Entities Index

```
┌───────────────────────────────────────────────────────────────────────────┐
│ Canonical Entity Hierarchy                                                │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│ Provider        │ Member          │ Claim           │ Authorization     │
│ (Practitioner / │ (Beneficiary /  │ (HCFA / UB-04   │ (Prior Auth       │
│ Facility)       │ Enrollee)       │ Intake)         │ Review)           │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ Payment         │ Organization    │ Person          │ Case              │
│ (Remittance /   │ (Payer / Health │ (Primitive)     │ (Task Unit)       │
│ Ledger Batch)   │ System)         │                 │                   │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┘
```

- [canonical-model/entities/provider.yaml](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/canonical-model/entities/provider.yaml)
- [canonical-model/entities/member.yaml](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/canonical-model/entities/member.yaml)
- [canonical-model/entities/claim.yaml](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/canonical-model/entities/claim.yaml)
- [canonical-model/entities/authorization.yaml](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/canonical-model/entities/authorization.yaml)
- [canonical-model/entities/payment.yaml](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/canonical-model/entities/payment.yaml)
- [canonical-model/entities/organization.yaml](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/canonical-model/entities/organization.yaml)

---

## 3. Governance Rules
1. Any modification to a canonical attribute MUST be reflected across DB DDL, OpenAPI contracts, FHIR mappings, and AI semantic catalogs.
2. Canonical schemas enforce strict type validation and explicit NULL constraints.
