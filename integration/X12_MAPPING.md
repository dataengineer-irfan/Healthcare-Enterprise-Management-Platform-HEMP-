# EDI X12 Healthcare Transaction Mapping Specification

## 1. Scope
Maps HEMP electronic claim and payment transactions to ANSI EDI X12 Version 5010 standards.

---

## 2. Transaction Sets

### 2.1 EDI 837P (Professional Claims)
- `ST*837*0001*005010X222A1~`: Transaction Set Header.
- `BHT*0019*00*1001*20260805*1430*CH~`: Beginning of Hierarchical Transaction.
- `NM1*85*2*GENERAL HOSPITAL*****XX*1234567890~`: Billing Provider NPI (Loop 2010AA).
- `NM1*QC*1*SMITH*JOHN****MI*SUB99201A~`: Patient / Subscriber ID (Loop 2010BA).
- `CLM*CLM99201*150.00***11:B:1*Y*A*Y*Y~`: Claim Header Billed Amount & Place of Service.

### 2.2 EDI 835 (Remittance Advice)
- `BPR*I*150.00*C*ACH*CTX*01*999999999*DA*11111111*1234567890**01*999999999*DA*22222222*20260805~`: Payment Payment Order / Remittance.
- `CLP*CLM99201*1*150.00*120.00*30.00*MC*10019201~`: Claim Payment Information.

---

## 3. Version History
- **v1.0.0** (2026-08-05): Initial release of EDI X12 Mapping Specification.
