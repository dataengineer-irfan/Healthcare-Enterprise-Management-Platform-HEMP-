# Healthcare Enterprise Management Platform (HEMP Demo Edition)

The **Healthcare Enterprise Management Platform (HEMP Demo Edition)** is a fully runnable, lightweight demonstration application featuring Java 21 / Spring Boot 3.x REST APIs, PostgreSQL Flyway persistence, JWT role-based access control (RBAC), and a React 19 Material UI frontend equipped with stable `data-testid` attributes for UI test automation.

---

## 🚀 Quick Start (Single Command)

### Option 1: Docker Compose (Recommended)
Run the entire platform (PostgreSQL database, Spring Boot backend, and React 19 frontend) with a single command:

```bash
docker-compose -f docker/docker-compose.yml up --build
```

- **Frontend Portal**: `http://localhost:3009`
- **Backend REST API**: `http://localhost:8090`
- **PostgreSQL Database**: `localhost:5432` (`hemp_db`)

---

### Option 2: Local Development Setup

#### 1. Start Database
```bash
docker run --name hemp-postgres -e POSTGRES_USER=hemp_admin -e POSTGRES_PASSWORD=hemp_secure_password -e POSTGRES_DB=hemp_db -p 5432:5432 -d postgres:15-alpine
```

#### 2. Run Backend (Java 21 / Spring Boot)
```bash
cd backend
mvn spring-boot:run
```

#### 3. Run Frontend (React 19 / Vite)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Demo Credentials & RBAC Roles

Log in at `http://localhost:3009/login` using the demo preset buttons or credentials:

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
