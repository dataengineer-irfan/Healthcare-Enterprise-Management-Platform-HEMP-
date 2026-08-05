# Non-Functional Requirements (NFR) Specification

## 1. Performance & Latency Metrics
- **NFR-PERF-01**: API Gateway response latency < 50ms at 95th percentile.
- **NFR-PERF-02**: Real-time 270/271 eligibility check response time < 150ms.
- **NFR-PERF-03**: Claim adjudication processing throughput > 1,000 claims per minute per service instance.

## 2. High Availability & Scalability
- **NFR-HA-01**: System uptime target 99.99% (maximum 52.5 minutes un-planned downtime per year).
- **NFR-SCL-01**: Horizontal Pod Autoscaler (HPA) triggers scale-out at 70% CPU/Memory utilization.

## 3. Compliance & Security
- **NFR-SEC-01**: Data at rest encrypted via AES-256; data in transit encrypted via TLS 1.3.
- **NFR-COMP-01**: 100% compliance with HIPAA Security Rule, CMS Medicaid Guidance, and NIST 800-53 controls.
