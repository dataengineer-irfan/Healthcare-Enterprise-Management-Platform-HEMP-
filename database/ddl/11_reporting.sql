-- =============================================================================
-- EHP-OS v3.0 Database DDL: 11_reporting.sql
-- Read-Optimized Reporting Schema & Materialized Views
-- =============================================================================

CREATE SCHEMA IF NOT EXISTS reporting;

CREATE MATERIALIZED VIEW reporting.mv_provider_network_summary AS
SELECT 
    taxonomy_code,
    credentialing_status,
    COUNT(*) as total_providers
FROM domain.provider_profile
GROUP BY taxonomy_code, credentialing_status;
