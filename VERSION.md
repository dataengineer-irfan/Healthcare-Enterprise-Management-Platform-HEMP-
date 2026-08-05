# HEMP Platform Version & Roadmap

## Current Version: `1.0.0-alpha`
- **Architecture Level**: Metadata-Driven Enterprise AI Platform (EAP v3.0 / EHP-OS)
- **Status**: Platform Kernel Foundation & Comprehensive Specifications Phase

---

## 🗺️ Roadmap & Milestones

### Milestone 1: Specifications & Architecture Bootstrap (Completed)
- [x] Master Specifications `00` through `04` (Project Context, Architecture, Database, Security, AI).
- [x] Extended Platform Specifications `05` through `15` (UI Design System, API Standards, Metadata Model, Workflow, Rules, Search, Documents, Notifications, Audit, Integration, Deployment).
- [x] Platform Decision Records (`/decisions/`).
- [x] AI Assistant Prompts (`/prompts/`) & End-to-End Reference Example (`/examples/`).

### Milestone 2: Platform Kernel Implementation (In Progress)
- [x] Domain-separated PostgreSQL DDLs (`01_kernel.sql` through `09_claims.sql`).
- [ ] Metadata Engine Runtime (Entity, Form, Grid, Workflow, Rules execution).
- [ ] Core REST/gRPC API Gateway & Security PDP/PEP middleware.

### Milestone 3: Healthcare Business Modules (Upcoming)
- [ ] Provider Management Module (Enrollment, Credentialing, Revalidation).
- [ ] Member Management Module (Eligibility, Enrollment, Benefits).
- [ ] Claims Management Module (Submission, Pre-adjudication, Pricing).
- [ ] Service Authorization & TPL Modules.

### Milestone 4: Multi-Brain AI Platform
- [ ] Text-to-SQL & RAG Engine via `ai.semantic_catalog`.
- [ ] Multi-Agent Assistant Orchestration (Business, Workflow, Analytics, Developer).

---

## 🏛️ Architecture Decisions Log
- `Decision-0001`: PostgreSQL 15+ as Transactional and Metadata Core.
- `Decision-0002`: Metadata-Driven Entity, UI, and Workflow Engine Architecture.
- `Decision-0003`: Security Guardrails & RBAC Propagation for AI Assistants.

---

## 🔄 Breaking Changes
- None (Initial Platform Specification & Core Setup).
