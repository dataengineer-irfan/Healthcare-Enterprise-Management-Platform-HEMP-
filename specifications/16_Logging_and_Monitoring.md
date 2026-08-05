# 16_Logging_and_Monitoring.md — Enterprise Logging & Monitoring Specification

## 1. Purpose
This document specifies structured JSON logging, distributed tracing, metrics collection, alerting, and observability standards for HEMP.

---

## 2. Scope
Applies to all microservices, API Gateways, database clusters, background workers, and AI assistant services.

---

## 3. Objectives
- Enforce structured JSON logging with mandatory correlation IDs (`X-Correlation-ID`).
- Implement OpenTelemetry distributed tracing across API request paths.
- Collect Prometheus metrics (RED & USE methods) and display via Grafana dashboards.

---

## 4. Standard Log Payload
```json
{
  "timestamp": "2026-08-05T22:57:00.000Z",
  "level": "INFO",
  "service": "provider-service",
  "correlationId": "c83b9201-92ab-4c31",
  "userId": "usr_99201a",
  "tenantId": "org_default",
  "message": "Provider enrollment application submitted",
  "context": { "providerId": "prv_8812a", "npi": "1234567890" }
}
```

---

## 5. Version History
- **v1.0.0** (2026-08-05): Initial release of Logging & Monitoring Specification.
