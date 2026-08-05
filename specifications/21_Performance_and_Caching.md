# 21_Performance_and_Caching.md — Performance & Caching Strategy Specification

## 1. Purpose
This document specifies multi-tier caching, Redis key invalidation policies, CDN edge delivery, database query optimization, and response latency targets across HEMP.

---

## 2. Caching Tiers
1. **L1 In-Memory Cache**: Application node cache for entity metadata definitions.
2. **L2 Shared Cache**: Redis 7 cluster for session state, API idempotency keys, and RBAC permission matrices.
3. **L3 Edge Cache / CDN**: Static asset delivery for UI bundles, design tokens, and document previews.

---

## 3. Version History
- **v1.0.0** (2026-08-05): Initial release of Performance & Caching Specification.
