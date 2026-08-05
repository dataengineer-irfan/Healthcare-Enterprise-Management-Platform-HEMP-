# Metadata-Driven Runtime Architecture Specification

## 1. Executive Summary
The Metadata-Driven Runtime interprets metadata schemas (`/metadata/entities/`, `/registry/`) at runtime to dynamically generate UI forms, grid views, workflow transitions, business rule validations, database queries, and notification dispatches without requiring source code recompilation or application redeployment.

---

## 2. Runtime Subsystems

```
┌───────────────────────────────────────────────────────────────────────────┐
│ Metadata-Driven Runtime Layer (EHP-OS v3.0)                               │
├─────────────────┬─────────────────┬─────────────────┬───────────────────┤
│ Metadata Loader │ Form Engine     │ Workflow Engine │ Rule Runtime      │
│ (L1 Cache Sync) │ (Dynamic UI)    │ (State Machine) │ (CEL Evaluator)   │
├─────────────────┼─────────────────┼─────────────────┼───────────────────┤
│ Query Engine    │ Report Engine   │ Notification Engine                 │
│ (Dynamic SQL)   │ (OLAP View)     │ (Multi-Channel Dispatch)            │
└─────────────────┴─────────────────┴─────────────────┴───────────────────┘
```

---

## 3. Subsystem Specifications

### 3.1 Metadata Loader (`runtime/metadata-loader/`)
- Hydrates JSON metadata schemas into L1 Redis cache upon service startup.
- Listens for GitOps metadata updates to invalidate in-memory schema caches in real-time.

### 3.2 Form Engine (`runtime/form-engine/`)
- Evaluates `FormSchema` to render dynamic form field controls, label translations, visibility conditions (`visibleIf`), and inline validation rules.

### 3.3 Workflow Runtime (`runtime/workflow-runtime/`)
- Executes state machine transitions, evaluates transition guard rules, and enforces `requiredRole` RBAC permissions.
