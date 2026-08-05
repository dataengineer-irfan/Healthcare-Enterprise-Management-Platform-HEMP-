-- =============================================================================
-- EHP-OS v3.0 Database View: v_provider_claims_summary.sql
-- Real-Time Operational View for Provider Claim Volume & Billed Payout Totals
-- =============================================================================

CREATE OR REPLACE VIEW reporting.v_provider_claims_summary AS
SELECT 
    p.provider_id,
    p.npi,
    COUNT(c.claim_id) AS total_claims_submitted,
    SUM(CASE WHEN c.claim_status = 'PAID' THEN 1 ELSE 0 END) AS paid_claims_count,
    SUM(CASE WHEN c.claim_status = 'DENIED' THEN 1 ELSE 0 END) AS denied_claims_count,
    COALESCE(SUM(c.total_billed_amount), 0.00) AS total_billed_dollars,
    COALESCE(SUM(c.total_paid_amount), 0.00) AS total_paid_dollars
FROM domain.provider_profile p
LEFT JOIN domain.claim_header c ON p.provider_id = c.provider_id
GROUP BY p.provider_id, p.npi;
