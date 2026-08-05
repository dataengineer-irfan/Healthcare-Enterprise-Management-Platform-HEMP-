# 05_UI_Design_System.md — Enterprise UI Design System Specification

## 1. Purpose
This document defines the visual design system, navigation patterns, component standards, grid systems, form layouts, accessibility rules, and responsive design guidelines for HEMP.

---

## 2. Scope
Applies to all frontend applications, metadata-driven component libraries, enterprise dashboards, and clinical portal screens across HEMP.

---

## 3. Objectives
- Establish a rich, modern, and accessible design system (Inter/Outfit typography, HSL color tokens, dark/light modes).
- Provide metadata-driven UI component abstractions (`MetadataForm`, `EnterpriseGrid`, `WorkflowBar`).
- Enforce WCAG 2.1 AA accessibility compliance across all UI controls.

---

## 4. Design Principles
1. **Metadata-First UI**: Drive form controls, grid columns, validations, and visibility rules from JSON metadata schemas.
2. **Visual Excellence**: Modern, cohesive aesthetic using curated HSL color palettes, subtle micro-animations, and clean visual hierarchy.
3. **Consistency**: Unified component behavior for sorting, filtering, modals, breadcrumbs, and notification toasts.
4. **Accessibility (a11y)**: Semantic HTML5, keyboard navigation, high contrast ratios, and screen reader compatibility.

---

## 5. UI Architecture & Design Tokens

### 5.1 Color System (HSL Tokens)
```css
:root {
  /* Brand Palette */
  --primary-hue: 215;
  --primary-500: hsl(var(--primary-hue), 85%, 48%);
  --primary-600: hsl(var(--primary-hue), 85%, 40%);
  
  /* Neutral Palette */
  --neutral-100: hsl(220, 15%, 97%);
  --neutral-800: hsl(220, 20%, 15%);
  --neutral-900: hsl(220, 25%, 10%);
  
  /* Status Colors */
  --success: hsl(145, 65%, 42%);
  --warning: hsl(38, 92%, 50%);
  --danger: hsl(355, 78%, 56%);
  --info: hsl(198, 88%, 48%);
}
```

### 5.2 Core Metadata UI Components
- **`MetadataForm`**: Reads `FormSchema` to render dynamic form controls (`text`, `select`, `date`, `multiselect`, `file_upload`).
- **`EnterpriseGrid`**: Unified tabular grid with multi-column sorting, filter drawer, column reordering, CSV/Excel export, and pagination.
- **`WorkflowBar`**: Renders current entity state machine status and available transition buttons.

---

## 6. Components & Layout Standards
- **Grid Layout**: 12-column responsive flex/grid system with 16px/24px gutters.
- **Form Layout**: 2-column or 3-column metadata field grids with inline validation error states.
- **Dialogs & Modals**: Centered backdrop modals with explicit primary/secondary actions.

---

## 7. Dependencies
- **React 18+ / Next.js 14+**.
- **Vanilla CSS / CSS Modules**.
- **Lucide Icons / Feather Icons**.

---

## 8. Security Considerations
- Content Security Policy (CSP) headers enforced.
- Input fields sanitize values to prevent XSS (Cross-Site Scripting).

---

## 9. AI Considerations
- UI components render an optional **AI Assistant Sidecar** panel enabling contextual natural language query assistance on any grid or form.

---

## 10. Future Enhancements
- Automated visual regression testing suite via Playwright.
- Theme customizer for multi-tenant portal white-labeling.

---

## 11. Cross References
- [00_Project_Context.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/00_Project_Context.md)
- [01_Architecture.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/01_Architecture.md)
- [06_API_Standards.md](file:///c:/Users/affra/Documents/ETS/Enterprise%20Healthcare%20Management%20Platform/specifications/06_API_Standards.md)

---

## 12. Version History
- **v1.0.0** (2026-08-05): Initial release of UI Design System Specification.
