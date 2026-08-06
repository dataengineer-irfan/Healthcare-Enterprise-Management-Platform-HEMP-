# Healthcare Enterprise Management Platform (HEMP Demo Edition)

The **Healthcare Enterprise Management Platform (HEMP Demo Edition)** is a fully runnable, lightweight demonstration application featuring Java 21 / Spring Boot 3.x REST APIs, PostgreSQL Flyway persistence, JWT role-based access control (RBAC), and a React 19 Material UI frontend equipped with stable `data-testid` attributes for UI test automation.

---

## 🚀 Deployment Options

### Option 1: Render.com Cloud Deployment (Blueprint)

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repository: `Healthcare-Enterprise-Management-Platform-HEMP-`.
4. Render will automatically detect `render.yaml` and provision:
   - **`hemp-demo-backend`**: Java 21 / Spring Boot 3.x REST API connected to Render PostgreSQL (`ets_sandbox`).
   - **`hemp-demo-frontend`**: React 19 / Nginx Web Portal.
5. Click **Apply**.

---

### Option 2: Local Docker Compose

Run the entire platform with a single command:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

- **Frontend Portal**: `http://localhost:3009`
- **Backend REST API**: `http://localhost:8090`
- **Render PostgreSQL**: Connected & pre-seeded (`ets_sandbox`)

---

## 🔐 Demo Credentials & RBAC Roles

Log in using the demo preset buttons or credentials:

| Username | Password | Role | Allowed Modules |
|----------|----------|------|-----------------|
| `admin` | `password123` | **Admin** | Full Access (Dashboard, Provider, Member, Claims, Reports, Admin, AI Studio) |
| `provider` | `password123` | **Provider** | Dashboard, Provider Management, User Profile |
| `member` | `password123` | **Member** | Dashboard, Member Eligibility, User Profile |

---

## 🧪 Automation Testing Identifiers (`data-testid`)

Every interactive component contains stable `data-testid` selectors:

- **Login Page**: `login-button`, `username-input`, `password-input`
- **Dashboard**: `dashboard-card-providers`, `dashboard-card-members`, `claims-dashboard`
- **Provider Module**: `provider-grid`, `provider-search-button`, `provider-enrollment-button`, `provider-save-button`
- **Member Module**: `member-grid`, `member-search-button`, `member-enrollment-button`, `member-save-button`
- **Claims Module**: `claim-grid`, `claim-search-button`, `claim-submit-button`, `claim-save-button`, `claim-approve-button-{id}`
- **AI Studio**: `ai-studio-chat`, `ai-prompt-input`, `ai-send-button`
- **Navigation & Logout**: `nav-dashboard`, `nav-provider-management`, `nav-member-management`, `user-menu-button`, `logout-button`
