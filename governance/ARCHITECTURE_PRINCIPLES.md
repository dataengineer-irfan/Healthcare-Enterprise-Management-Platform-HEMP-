# Governance: Architecture Principles

## 1. Metadata First
Every business capability (entity, form, grid, workflow, rule) MUST be defined in declarative JSON metadata before source code implementation.

## 2. API First
RESTful OpenAPI 3.0 / gRPC contracts MUST be committed and approved prior to backend/frontend development.

## 3. AI Native & Governed
AI assistants operate strictly via authorized REST endpoints or governed database views. Un-sandboxed query execution is prohibited.

## 4. Security by Design
Zero-Trust architecture. Every request authenticates, authorizes against RBAC/ABAC permissions, and writes immutable audit logs.
