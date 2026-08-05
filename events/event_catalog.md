# Platform Domain Event Catalog

## 1. Executive Summary
This catalog defines the asynchronous domain events published over the Message Broker (Kafka / RabbitMQ) across HEMP.

---

## 2. Master Event Registry

| Event Name | Domain | Producer | Consumers | Schema Location | Idempotency Key |
|------------|--------|----------|-----------|-----------------|-----------------|
| `ProviderEnrolledEvent` | `provider` | `provider-service` | `audit`, `notification`, `ai` | `events/provider/ProviderEnrolledEvent.yaml` | `providerId` |
| `ClaimSubmittedEvent` | `claims` | `claims-service` | `adjudication`, `tpl`, `audit` | `events/claims/ClaimSubmittedEvent.yaml` | `claimId` |
| `ClaimAdjudicatedEvent` | `claims` | `adjudication-engine` | `finance`, `notification` | `events/claims/ClaimAdjudicatedEvent.yaml` | `claimId + version` |
| `PaymentIssuedEvent` | `finance` | `finance-service` | `remittance-835`, `reporting` | `events/finance/PaymentIssuedEvent.yaml` | `batchId` |

---

## 3. Standard Event Header Envelope
```json
{
  "eventId": "evt_99201a",
  "eventType": "ClaimSubmittedEvent",
  "eventSource": "hemp.claims-service",
  "correlationId": "c83b9201-92ab-4c31",
  "timestamp": "2026-08-05T23:48:00.000Z",
  "schemaVersion": "1.0",
  "payload": {}
}
```
