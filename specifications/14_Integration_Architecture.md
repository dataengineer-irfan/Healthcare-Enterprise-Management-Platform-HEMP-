# 14_Integration_Architecture.md — Integration Architecture Specification

## 1. Purpose
This document specifies integration protocols for external healthcare standards (FHIR R4, EDI X12 837/835/270/271/278), webhooks, and REST/gRPC interfaces across HEMP.

---

## 2. Scope
Applies to clearinghouse integrations, EHR/EMR interoperability, state Medicaid interfaces, and external payment processors.

---

## 3. Integration Standards
- **EDI X12**: Parse and generate X12 837 (Claims), X12 835 (Remittance), X12 270/271 (Eligibility), X12 278 (Prior Auth).
- **HL7 FHIR R4**: RESTful FHIR API mapping layer (`/fhir/r4/Patient`, `/fhir/r4/Practitioner`, `/fhir/r4/Claim`).

---

## 4. Version History
- **v1.0.0** (2026-08-05): Initial release of Integration Architecture Specification.
