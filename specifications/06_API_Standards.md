# 06_API_Standards.md — Enterprise API Standards Specification

## 1. Purpose
This document specifies API design conventions, URL patterns, error models, pagination, filtering, sorting, versioning, authentication, idempotency, correlation IDs, and rate limiting across HEMP.

---

## 2. Scope
Applies to all RESTful APIs, gRPC services, GraphQL endpoints, and external webhook integrations.

---

## 3. Objectives
- Establish OpenAPI 3.0 as the standard for REST APIs.
- Provide a unified JSON error payload structure.
- Standardize pagination (`page`, `pageSize`), filtering, and sorting (`sort=+lastName,-createdAt`).
- Enforce correlation IDs (`X-Correlation-ID`) across distributed microservice calls.

---

## 4. Design Principles
1. **RESTful Resource Orientation**: Use standard HTTP methods (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) with plural resource nouns (`/api/v1/providers`).
2. **Idempotency**: Require `Idempotency-Key` headers for unsafe state-changing operations (`POST`, `PATCH`).
3. **Backward Compatibility**: API versioning via URL prefix (`/api/v1/...`). Breaking changes require new major version increments.
4. **Unified Error Envelope**: RFC 7807 Problem Details compliant JSON responses.

---

## 5. API Response Envelopes & Standards

### 5.1 Standard Success Envelope
```json
{
  "success": true,
  "data": { "id": "123e4567-e89b-12d3-a456-426614174000", "name": "General Hospital" },
  "meta": {
    "page": 1,
    "pageSize": 20,
    "totalRecords": 150,
    "totalPages": 8
  },
  "correlationId": "c83b9201-92ab-4c31"
}
```

### 5.2 Standard Error Envelope (RFC 7807)
```json
{
  "type": "https://hemp.health/errors/validation-error",
  "title": "Invalid Request Parameters",
  "status": 400,
  "detail": "NPI number must be exactly 10 numeric digits.",
  "instance": "/api/v1/providers/enroll",
  "invalidParams": [
    { "name": "npi", "reason": "Length must be 10" }
  ],
  "correlationId": "c83b9201-92ab-4c31"
}
```

---

## 6. Headers & Interceptors
- `Authorization`: `Bearer <jwt_access_token>`
- `X-Correlation-ID`: `UUIDv4` passed through all downstream microservice calls.
- `Idempotency-Key`: `UUIDv4` stored in Redis for 24 hours to prevent duplicate transactions.

---

## 7. Dependencies
- **OpenAPI 3.0 / Swagger UI**.
- **Protobuf / gRPC**.

---

## 8. Security Considerations
- CORS configured with explicit allowed origins.
- Rate limiting enforced at API Gateway (e.g. 100 requests/minute per user IP).

---

## 9. AI Considerations
- The API Gateway exposes `/api/v1/ai/query` for Text-to-SQL and RAG retrieval, applying the user's security context before forwarding.

---

## 10. Future Enhancements
- gRPC Web support for browser-direct high performance RPC streams.

---

## 11. Cross References
- [01_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/01_Architecture.md)
- [03_Security_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/03_Security_Architecture.md)

---

## 12. Version History
- **v1.0.0** (2026-08-05): Initial release of API Standards Specification.
