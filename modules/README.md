# Domain Modules

This directory contains modular business domain declarations and bounded contexts built on top of the Platform Kernel (EHP-OS).

## Modules Structure
- `provider/`: Provider enrollment, credentialing, revalidation, and facility networks.
- `member/`: Member eligibility, coverage, and benefit plans.
- `claims/`: Claim submission (837/HCFA), pre-adjudication, pricing, processing, and billing.
- `auth/`: Service Prior Authorization (PA) and utilization management.
- `tpl/`: Third Party Liability and Coordination of Benefits (COB).
- `finance/`: Claims remittance (835) and financial processing.
