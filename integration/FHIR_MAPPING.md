# HL7 FHIR R4 Interoperability Mapping Specification

## 1. Scope
Maps HEMP platform internal relational schemas to HL7 FHIR R4 JSON resources.

---

## 2. Resource Mappings

### 2.1 Practitioner Resource (`/fhir/r4/Practitioner`)
| HEMP Table Field | FHIR R4 Attribute | Data Type | Notes |
|------------------|-------------------|-----------|-------|
| `domain.provider_profile.npi` | `Practitioner.identifier[NPI]` | Identifier | System: `http://hl7.org/fhir/sid/us-npi` |
| `domain.person.first_name` | `Practitioner.name.given[0]` | String | First Name |
| `domain.person.last_name` | `Practitioner.name.family` | String | Family Name |
| `domain.provider_profile.taxonomy_code` | `Practitioner.qualification.code` | CodeableConcept | NUCC Taxonomy Code |

### 2.2 Patient Resource (`/fhir/r4/Patient`)
| HEMP Table Field | FHIR R4 Attribute | Data Type | Notes |
|------------------|-------------------|-----------|-------|
| `domain.member_eligibility.subscriber_number` | `Patient.identifier[SubscriberNo]` | Identifier | Member Subscriber ID |
| `domain.person.date_of_birth` | `Patient.birthDate` | Date | YYYY-MM-DD |

---

## 3. Version History
- **v1.0.0** (2026-08-05): Initial release of FHIR Mapping Specification.
