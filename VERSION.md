# HEMP Platform Version & Governance

## Current Version: `1.0.0 (LOCKED BASELINE)`
- **Effective Date**: 2026-08-05
- **Status**: Architecture Baseline Locked via [specifications/00_ARCHITECTURE_BASELINE_LOCK_v1.0.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/00_ARCHITECTURE_BASELINE_LOCK_v1.0.md) and [ADR-0001](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/adr/ADR-0001-Architecture-Baseline-Lock-v1.0.md).
- **Governance Mode**: Strict ADR-Driven Architecture Change Management.

---

## 🔒 Architecture Lock Rules
1. High-level architecture phase is CLOSED.
2. Ad hoc modifications to kernel layer boundaries, data models, or core principles are PROHIBITED.
3. All future architecture evolution requires a formal ADR (`/adr/` or `/decisions/`) and impact analysis.
4. All future module work transitions directly to **implementation-ready specifications and complete code deliverables**.

---

## 🗺️ Implementation Deliverables Queue
1. Platform Kernel PostgreSQL Complete DDL (`database/ddl/01_kernel.sql`).
2. Metadata Schema (`metadata/entities/`, `metadata/attributes/`, `metadata/workflows/`, `metadata/forms/`).
3. Identity & Access Management (IAM) Implementation Specification.
4. Provider Management Implementation Specification.
5. Member Management Implementation Specification.
6. Claims Management Implementation Specification.
