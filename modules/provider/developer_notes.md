# Provider Module — Developer Notes

- NPPES Registry integration API client resides in `backend/services/provider-service/integrations/nppes.ts`.
- Caching layer caches active provider taxonomy lookups in Redis for 24 hours.
