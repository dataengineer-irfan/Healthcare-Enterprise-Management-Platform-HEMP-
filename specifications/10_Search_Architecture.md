# 10_Search_Architecture.md — Hybrid Search Architecture Specification

## 1. Purpose
This document specifies the hybrid search layer for HEMP, combining relational structured queries, full-text indexing, vector semantic search, and AI RAG retrieval.

---

## 2. Scope
Applies to global application search, entity search grids, clinical document retrieval, and AI Knowledge Brain query routing.

---

## 3. Architecture Topology

```
┌───────────────────────────────────────────────────────────────────────────┐
│ User Query ("Find active cardiology providers in Miami")                 │
└─────────────────────────────────────┬─────────────────────────────────────┘
                                      │
┌─────────────────────────────────────▼─────────────────────────────────────┐
│ Search Router & Query Classifier                                          │
├─────────────────────────┬───────────────────────┬─────────────────────────┤
│ Structured Entity Filter│ Full-Text Index (BM25)│ Vector Embedding        │
│ (PostgreSQL B-Tree)     │ (pg_trgm / tsvector)  │ (pgvector HNSW)         │
└─────────────────────────┴───────────────────────┴─────────────────────────┘
```

---

## 4. Components & Search Engines
- **Relational Search**: Indexed PostgreSQL queries for exact key matches (NPI, SSN, Claim ID).
- **Full-Text Search (FTS)**: Trigram and tsvector indexing for names, titles, and text notes.
- **Vector Search**: `pgvector` HNSW indexes for semantic similarity context retrieval.

---

## 5. Security & AI Governance
- Search queries strictly inherit user RBAC filter constraints (`WHERE state = user.state`).

---

## 6. Version History
- **v1.0.0** (2026-08-05): Initial release of Hybrid Search Architecture Specification.
