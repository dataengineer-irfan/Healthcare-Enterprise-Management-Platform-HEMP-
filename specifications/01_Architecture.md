# 01_Architecture.md — Technical Architecture Specification

## 1. Purpose
This document defines the enterprise technical architecture for HEMP, outlining system layers, frontend/backend designs, platform kernel engines, service boundaries, integration protocols, deployment topologies, and engineering standards.

---

## 2. Scope
Applies to all microservices, backend runtimes, frontend applications, messaging infrastructures, and deployment pipelines across all environments (Development, Staging, Production).

---

## 3. Objectives
- Establish clear separation of concerns between Platform Kernel, Domain Framework, Business Modules, and AI Platform.
- Define microservices service boundaries, REST/gRPC contracts, and event-driven communication models.
- Standardize frontend dynamic metadata-driven layout rendering and backend metadata execution runtimes.
- Provide a cloud-native, scalable deployment architecture (Docker/Kubernetes).

---

## 4. Design Principles
1. **Separation of Concerns**: Isolate platform infrastructure and metadata engines from domain business logic.
2. **Metadata-Driven Execution**: Render UIs and execute workflows dynamically based on JSON metadata schemas.
3. **Stateless Backend Services**: Scale horizontal application instances seamlessly.
4. **Event-Driven Asynchrony**: Use domain events for inter-module decoupling (e.g. `ProviderEnrolledEvent`, `ClaimSubmittedEvent`).
5. **Contract-First APIs**: Strict OpenAPI 3.0 / Protobuf definitions before code implementation.

---

## 5. Architecture

### 5.1 Overall & Layered Topology
```
┌───────────────────────────────────────────────────────────────────────────┐
│ Frontend UI Layer (React / Next.js Metadata Component Library)            │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │ REST / GraphQL / WebSocket
┌─────────────────────────────────────▼─────────────────────────────────────┐
│ API Gateway / Reverse Proxy (Authentication, Rate Limiting, CORS)          │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
┌─────────────────────────────────────▼─────────────────────────────────────┐
│ Platform Kernel & Domain Microservices                                    │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────────┐  │
│ │ Kernel Services    │ │ Healthcare Modules │ │ AI Platform Gateway    │  │
│ │ (Entity, Form, Grid│ │ (Provider, Member, │ │ (RAG, Text-to-SQL,     │  │
│ │ Workflow, Rules)   │ │ Claims, Auth, TPL) │ │ Multi-Agent Hub)       │  │
│ └────────────────────┘ └────────────────────┘ └────────────────────────┘  │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
┌─────────────────────────────────────▼─────────────────────────────────────┐
│ Data & Persistence Infrastructure                                         │
│ ┌────────────────────┐ ┌────────────────────┐ ┌────────────────────────┐  │
│ │ PostgreSQL 15+ DB  │ │ Redis Cache & Lock │ │ Vector Search Engine   │  │
│ └────────────────────┘ └────────────────────┘ └────────────────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Frontend Architecture
- **Framework**: Next.js / React with TypeScript.
- **Styling**: Vanilla CSS / CSS Modules with core design tokens (variables for theme, spacing, typography).
- **Core Engine Components**:
  - `MetadataForm`: Parses `FormSchema` to render dynamic form controls and field validations.
  - `EnterpriseGrid`: Unified grid supporting sorting, filtering, column reordering, export, and pagination.
  - `WorkflowBar`: Renders current state and available action buttons (`Submit`, `Approve`, `Reject`).

### 5.3 Backend Architecture
- **Microservices Stack**: Node.js / Python / Go modular services.
- **Service Boundaries**:
  - `kernel-service`: Entity, Form, Grid, Workflow, Rules, and Audit Engine execution.
  - `provider-service`: Provider credentialing, enrollment, and network management.
  - `member-service`: Member eligibility, coverage, and benefit plans.
  - `claims-service`: Intake, adjudication, pricing engine.
  - `ai-service`: LLM gateway, Text-to-SQL parser, RAG context builder.

---

## 6. Components & Engine Interfaces

### 6.1 Platform Kernel Engines
1. **Entity Engine**: Resolves entity schemas, enforces temporal tracking, executes dynamic CRUD.
2. **Form Engine**: Validates form inputs against field definitions and rules.
3. **Grid Engine**: Translates grid query parameters into optimized SQL queries.
4. **Workflow Engine**: Enforces valid state transitions and triggers task assignments.
5. **Rules Engine**: Evaluates rule expressions (`IF condition THEN action`).

### 6.2 Service Communication
- **Synchronous**: REST over HTTPS (JSON) or gRPC (Protobuf).
- **Asynchronous**: Event Broker (Kafka/RabbitMQ) for domain event broadcasting.

---

## 7. Dependencies
- **API Gateway**: Kong / NGINX.
- **Message Broker**: Apache Kafka / RabbitMQ.
- **State Store**: Redis 7+.

---

## 8. Security Considerations
- TLS 1.3 enforced for all microservice communication.
- Mutual TLS (mTLS) for internal service-to-service calls.
- API Gateway validates JWT tokens prior to routing requests to backend services.

---

## 9. AI Considerations
- The `ai-service` acts as an isolated gateway. All AI queries pass through the API Gateway, enforcing standard user RBAC before executing Text-to-SQL or RAG retrieval.

---

## 10. Future Enhancements & Scalability
- Horizontal Pod Autoscaling (HPA) based on CPU/RAM and request queue depth.
- Multi-region database replication with localized read-replicas.

---

## 11. Cross References
- [00_Project_Context.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/00_Project_Context.md)
- [02_Database_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/02_Database_Architecture.md)
- [03_Security_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/03_Security_Architecture.md)

---

## 12. Version History
- **v1.0.0** (2026-08-05): Initial release of Technical Architecture Specification.
