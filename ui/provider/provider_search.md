# Provider Search Screen Specification

## 1. Screen Metadata
- **Screen ID**: `PRV-SCR-001`
- **Route**: `/healthcare/providers/directory`
- **Breadcrumb**: `Home / Healthcare / Providers / Directory`
- **Role Visibility**: `healthcare:provider:view`

---

## 2. Layout & Wireframe Components
- **Top Action Bar**: Primary action button `+ Enroll New Provider`, secondary action `Export Network Roster (CSV)`.
- **Search Panel**: Filter controls for NPI (text input), Specialty (dropdown select), State (dropdown select), and Status (`ACTIVE`, `PENDING`, `REJECTED`).
- **Enterprise Data Grid**:
  - Columns: `NPI`, `Practitioner / Facility Name`, `Specialty Taxonomy`, `State License`, `Credentialing Status`, `Actions`.
  - Row Actions: `View Profile`, `Revalidate`.

---

## 3. API Mapping
- Search Grid Data: `GET /api/v1/providers?npi={npi}&state={state}`

---

## 4. Accessibility & Responsive Rules
- Mobile viewport collapses grid into stacked summary cards.
- Keyboard navigation supported via `Tab` and `Enter` key triggers.
