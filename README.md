# Enterprise Healthcare Management Platform (HEMP) / Enterprise AI Platform (EAP v3.0)

An enterprise-grade, metadata-driven, AI-first platform architecture designed to power scalable healthcare administration (and easily extensible to adjacent enterprise domains like finance, insurance, and government).

---

## 🏛️ Architecture Overview

The platform operates on **EHP-OS (Enterprise Healthcare Platform Operating System)** built across 4 integrated layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│ Layer 4: AI Platform & Specialized Assistants                         │
│ (Business, Workflow, Analytics, Text-to-SQL, Developer Assistants)    │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 3: Healthcare Business Domain Modules                            │
│ (Provider, Member, Claims, Service Auth, TPL, Finance, Reports)        │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 2: Generic Domain Framework                                      │
│ (Person, Organization, Address, Contact, Task, Case, Event, Timeline)  │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Platform Kernel Services                                      │
│ (Entity Engine, Form Engine, Grid Engine, Workflow, Rules, Audit, AI)  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧠 The 4 Platform Brains

1. **Transaction Brain**: Handles core CRUD operations, REST/gRPC APIs, state machine workflows, security, and RBAC.
2. **Knowledge Brain**: Houses business glossaries, entity catalogs, semantic relationship models, system specs, and public healthcare standards (FHIR, X12).
3. **Analytics Brain**: Read-optimized semantic layer, aggregated metrics, reporting data models, and executive dashboards.
4. **AI Brain**: Multi-agent orchestration, natural language RAG pipelines, Text-to-SQL engines, prompt registries, and auditable tool execution.

---

## 📁 Repository Structure

```
├── docs/                   # Architecture, business specifications, API/UI guides
│   ├── architecture/
│   ├── business/
│   ├── workflows/
│   ├── ui/
│   └── api/
├── metadata/               # Digital twin / metadata configuration engine
│   ├── entities/
│   ├── workflows/
│   ├── rules/
│   ├── ui/
│   ├── reports/
│   ├── glossary/
│   └── semantic/
├── database/               # Database DDL, migrations, seed data, reference tables
│   ├── ddl/
│   ├── migrations/
│   ├── seed/
│   └── reference/
├── backend/                # Platform Kernel runtime and domain microservices
├── frontend/               # Metadata-driven UI application (React/Next.js)
├── ai/                     # AI Prompts, Agents, RAG pipeline, Text-to-SQL
│   ├── prompts/
│   ├── agents/
│   ├── text2sql/
│   ├── rag/
│   └── evaluations/
└── tests/                  # End-to-end integration and compliance test suite
```

---

## 🗺️ Implementation Roadmap

### Phase 1: Platform Kernel Foundation (Current Phase)
- Platform Kernel PostgreSQL DDL (`01_kernel_ddl.sql`).
- Metadata engine definitions & schemas.
- Business Glossary initialization.
- Core Audit & AI Governance framework.

### Phase 2: Domain Framework & Kernel Runtimes
- Base domain entities (`Person`, `Organization`, `Task`, `Case`).
- Shared Kernel engines (Entity, Form, Grid, Workflow, Rules).

### Phase 3: Healthcare Domain Modules
- **Provider Management** (Enrollment, Credentialing, Revalidation).
- **Member Management** (Eligibility, Enrollment, Benefits).
- **Claims Management** (Submission, Adjudication, Pricing).
- **Service Authorization** (Prior Auth, Utilization Review).
- **TPL & Financial Operations** (Third Party Liability, Remittance, Payments).
- **Contact Management & Executive Analytics**.

### Phase 4: Enterprise AI Integration
- Semantic Graph RAG and Text-to-SQL runtime.
- Multi-Agent Orchestration & Audited Execution.

---

## 📜 Standard Operating Principles
- **Configuration Before Customization**: Drive behaviors through metadata, rules, and workflows before writing custom code.
- **AI-Ready Schema**: Every business table pairs with a rich metadata entry describing business definitions, allowed operations, and natural language query hints.
- **Strict AI Governance**: Every AI operation authenticates, authorizes, resolves entities via the semantic catalog, executes governed APIs, logs audit entries, and returns explainable results.
