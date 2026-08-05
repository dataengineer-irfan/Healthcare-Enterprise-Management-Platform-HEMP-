# Provider Module — Test Scenarios & Suites

- `TEST-PRV-01`: Verify valid NPI enrollment submission returns HTTP 201.
- `TEST-PRV-02`: Verify invalid 9-digit NPI fails validation with HTTP 400 RFC 7807 error.
- `TEST-PRV-03`: Verify non-credentialing user receives HTTP 403 on credentialing approval endpoint.
