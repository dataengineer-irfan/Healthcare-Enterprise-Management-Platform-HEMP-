# Provider Module — Database Architecture & Schema

## 1. Schema Isolation
All provider domain tables reside in `provider` schema or `domain.provider_profile`.

## 2. Table Structures
- `domain.provider_profile`: Master provider profile record.
- `provider.credentialing_case`: Credentialing application case history.
- `provider.network_contract`: Payer network contract assignments.
