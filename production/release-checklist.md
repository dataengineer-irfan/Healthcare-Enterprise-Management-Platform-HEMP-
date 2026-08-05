# Production Release & Go-Live Checklist

## 1. Pre-Deployment Verification
- [ ] All unit, integration, and E2E Playwright test suites pass (100% green).
- [ ] Code coverage target > 85% verified by SonarQube.
- [ ] SAST / DAST security scans completed with zero critical/high vulnerabilities.
- [ ] Database DDL migration scripts executed cleanly against staging environment.

## 2. Infrastructure & Capacity Check
- [ ] Kubernetes HPA autoscaling policies configured and tested under peak load.
- [ ] Multi-region PostgreSQL WAL replication in sync (replication lag < 1 sec).
- [ ] Key Vault / Secrets Manager secrets rotated and accessible by production pods.

## 3. Go-Live Rollout Strategy
- [ ] Execute Blue-Green deployment swap on API Gateway.
- [ ] Verify synthetic health check endpoints (`/health/liveness` & `/health/readiness`).
- [ ] Monitor Prometheus error rate metrics and OpenTelemetry trace traces for 60 minutes.
