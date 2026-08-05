# Decision-0001: PostgreSQL 15+ as Core Transactional & Metadata Storage

## Status
**ACCEPTED** (2026-08-05)

## Context
HEMP requires an enterprise data store capable of handling high-throughput transactional workloads, complex relational queries, flexible JSON metadata schemas, spatial location data, full-text search, and AI vector embeddings.

## Alternatives Evaluated
1. **Multi-Database Polyglot (MongoDB + PostgreSQL + Neo4j)**: High operational complexity and cross-system transaction consistency overhead.
2. **Pure NoSQL (MongoDB)**: Lacks strong ACID relational transaction guarantees required for claims pricing and financial ledgers.
3. **PostgreSQL 15+ with Extensions (`JSONB`, `pgvector`, `pg_trgm`)**: Single unified database engine handling ACID relational tables, JSON metadata, trigram search, and AI vector embeddings.

## Decision
Adopt **PostgreSQL 15+** as the single primary transactional, metadata, and vector storage core across all platform layers.

## Consequences
- Single unified backup, replication, and disaster recovery strategy.
- Developers and AI coding assistants interact with a single standardized SQL engine.
- High performance via JSONB GIN indexes and `pgvector` HNSW indexes.
