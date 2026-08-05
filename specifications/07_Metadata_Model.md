# 07_Metadata_Model.md — Platform Metadata Model Specification

## 1. Purpose
This document specifies the metadata architecture, digital twin entity modeling, dynamic schema definitions, attribute types, relationships, form layouts, and AI semantic bindings in HEMP.

---

## 2. Scope
Applies to the metadata repository (`/metadata`), entity definitions, dynamic field configurations, business rule bindings, and AI knowledge catalog maps.

---

## 3. Objectives
- Define the canonical schema for entity, attribute, relationship, form, workflow, and rule metadata.
- Enable dynamic system changes via configuration files without recompiling or redeploying binary code.
- Serve as the primary Knowledge Brain feed for AI RAG context and Text-to-SQL generation.

---

## 4. Metadata Hierarchy

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Metadata Repository (/metadata)                                         │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│ /entities       │ /attributes     │ /relationships  │ /forms            │
│ (Entity Master) │ (Field Definitions)│ (Foreign Keys) │ (UI Layouts)      │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ /workflows      │ /rules          │ /reports        │ /semantic         │
│ (State Machines)│ (Business Rules)│ (Grid & OLAP)   │ (AI Digital Twin) │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┘
```

---

## 5. Metadata Schema Contracts

### 5.1 Master Entity Schema Example (`metadata/entities/provider.json`)
```json
{
  "entityId": "healthcare.provider",
  "entityName": "Provider",
  "displayName": "Healthcare Provider",
  "domain": "healthcare",
  "tableName": "provider_profile",
  "schemaName": "domain",
  "version": 1,
  "attributes": [
    { "name": "npi", "type": "string", "length": 10, "required": true, "searchable": true },
    { "name": "taxonomy_code", "type": "string", "required": true, "searchable": true },
    { "name": "organization_name", "type": "string", "required": false, "searchable": true }
  ],
  "relationships": [
    { "targetEntity": "domain.organization", "type": "MANY_TO_ONE", "foreignKey": "organization_id" }
  ]
}
```

---

## 6. Components & Engine Binding
- **Entity Engine**: Hydrates metadata JSON at startup and validates incoming payload structures against field definitions.
- **AI Brain Link**: Auto-generates `ai.semantic_catalog` rows whenever a new entity metadata JSON is committed.

---

## 7. Dependencies
- **JSON Schema Draft-07**.
- **PostgreSQL JSONB columns**.

---

## 8. Security Considerations
- Metadata definitions are read-only at runtime; changes are audited through Git version control.

---

## 9. AI Considerations
- Metadata JSON files are indexed into the Knowledge Brain vector store for exact schema matching during natural language query processing.

---

## 10. Future Enhancements
- Visual drag-and-drop Metadata Studio editor for business analysts.

---

## 11. Cross References
- [00_Project_Context.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/00_Project_Context.md)
- [01_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/01_Architecture.md)

---

## 12. Version History
- **v1.0.0** (2026-08-05): Initial release of Platform Metadata Model Specification.
