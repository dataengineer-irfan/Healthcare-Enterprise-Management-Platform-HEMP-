-- =============================================================================
-- EHP-OS v3.0 Database Function: fn_adjudicate_claim.sql
-- Transactional Function Pricing & Auto-Adjudicating a Submitted Claim
-- =============================================================================

CREATE OR REPLACE FUNCTION domain.fn_adjudicate_claim(
    p_claim_id UUID,
    p_discount_rate NUMERIC DEFAULT 0.80
)
RETURNS TABLE (
    claim_id UUID,
    status VARCHAR(32),
    paid_amount NUMERIC
) AS $$
DECLARE
    v_billed NUMERIC;
    v_calculated_paid NUMERIC;
BEGIN
    SELECT total_billed_amount INTO v_billed
    FROM domain.claim_header
    WHERE claim_id = p_claim_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Claim % not found', p_claim_id;
    END IF;

    v_calculated_paid := ROUND((v_billed * p_discount_rate)::numeric, 2);

    UPDATE domain.claim_header
    SET total_paid_amount = v_calculated_paid,
        claim_status = 'ADJUDICATED'
    WHERE claim_id = p_claim_id;

    RETURN QUERY
    SELECT p_claim_id, 'ADJUDICATED'::VARCHAR(32), v_calculated_paid;
END;
$$ LANGUAGE plpgsql;
