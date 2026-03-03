# AI Coding Agent Instructions - Hackathon2026

## Architecture Overview

**Stack**: Django REST Framework + React (Vite) + PostgreSQL, fully dockerized.

**Multi-Entity Authentication System**: Critical architectural decision - three separate entity types (User, Company, InstitutionFormation) share a unified JWT authentication via custom `CookieJWTAuthentication`. JWT tokens contain `entity_type` and `entity_id` claims. All authentication uses HTTPOnly cookies (`access_token`, `refresh_token`), never localStorage.

**Service Boundaries**:

- Backend: `/backend` - Django apps follow pattern: `apps/{AppName}/models.py|views.py|serializers.py|urls.py`
- Frontend: `/frontend/src` - React components, organized by purpose (see below)
- Database: PostgreSQL on port 5433 (external), 5432 (internal)

## Critical Developer Workflows

### Start Development Environment

```bash
docker compose up -d
```

### Backend Commands (Django)

Always run inside backend container:

```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py shell
```

### Database Initialization

SQL seed files in `backend/sql/` (categories, requirements, roles) - must be loaded manually if needed.

### Frontend Development

Frontend container runs Vite dev server on `:5173` with HMR. Node modules are volume-mounted separately to avoid platform issues.

## Project-Specific Conventions

### Frontend Component Organization (Recently Refactored)

```
components/
├── ui/              # Reusable UI primitives
│   ├── FormInput/   # Text/email/password/textarea with error slots
│   ├── Checkbox/    # Checkbox with validation
│   ├── FormButton/  # Submit buttons with loading states
│   └── FormBody/    # Common form wrapper (card, logo, header, form)
└── forms/           # Feature-specific form implementations
    ├── FormEmpresas/
    ├── Login estudiantes/
    └── Register estudiantes/
```

**Theming Pattern**: Shared components accept `className` props for CSS theming (e.g., `zfem-*` for empresa forms, `zfll-*` for login, `register-*` for student registration). Each form maintains its own CSS file with theme-specific classes.

**Error Display Convention**: Error messages render below inputs with **reserved space** (`min-height: 0.85rem`, `visibility: hidden` when empty) to prevent layout shifts. Never conditionally render error elements - toggle `visibility` instead.

### Backend API Patterns

**Authentication Endpoints**:

- `auth/login/` - Accepts `identifier` (email OR phone for users, email-only for companies/institutions) + `password`
- `auth/register/user/` - Immediate activation + auto-login
- `auth/register/company/` - Pending approval (is_active=False)
- `auth/register/institution/` - Pending approval (is_active=False)
- `auth/refresh/` - Auto-called by axios interceptor on 401

**Permission Classes**:

- `IsAdmin` - Django superuser (User with is_superuser=True)
- `IsCompany` - isinstance(request.user, Company)
- `IsInstitution` - isinstance(request.user, InstitutionFormation)

**Serializer Pattern**: Separate serializers for registration, login, profile, and pending approval. Login returns minimal response; use `auth/me/` for profile data.

### Frontend API Integration

**API Client**: `/frontend/src/libs/axios.js` - Configured with:

- Base URL: `http://localhost:8000/api`
- `withCredentials: true` (for cookies)
- Auto-refresh interceptor (retries original request after refresh)

**API Service Wrappers**: `/frontend/src/services/api.js`

```javascript
postData(obj, endpoint); // POST to endpoint/, auto-appends trailing slash
getData(endpoint); // GET from endpoint/
patchData(obj, endpoint, id); // PATCH to endpoint/id/
deleteData(endpoint, id); // DELETE endpoint/id/, returns {success: true}
```

### Django App Structure

**App Naming**: Some apps use PascalCase (Documents, Vacancies, Postulations, Notificattions) - follow existing convention when creating related files.

**Models Inheritance**:

- User extends `AbstractBaseUser` with custom manager
- Company and InstitutionFormation are plain models with manual password hashing (`set_password`, `check_password`)
- All entities have `is_active` field; companies/institutions default to `False` (pending approval workflow)

### CSS Architecture

**No CSS Modules**: Plain CSS files with BEM-like naming. Components import their own CSS (e.g., `import './FormInput.css'`).

**Global Resets**: Each major form applies its own reset (`* { margin: 0; padding: 0; box-sizing: border-box }`).

**Theming via Props**: Pass className strings to shared components rather than using CSS variables.

## External Dependencies & Integration Points

**AWS S3**: Configured via `STORAGES` setting for media uploads. Uses boto3, requires AWS credentials in env.

**SendGrid**: Email service for approval notifications. See `backend/apps/authentication/emails.py`.

**SweetAlert2**: Frontend notification library - use `Swal.fire()` for success/error messages after form submissions.

## Common Pitfalls

1. **Entity Type Confusion**: When calling `auth/me/`, response shape differs by entity type. Check `entity_type` field before accessing entity-specific properties.

2. **Trailing Slashes**: Django URLs expect trailing slashes. API wrapper adds them automatically - don't include in endpoint strings.

3. **Docker Volume Mounts**: Backend code changes hot-reload, but requirements.txt changes require container rebuild (`docker compose up -d --build backend`).

4. **Form State Management**: When creating forms with exclusive checkboxes (like company/institution selector), store single state value (`entityType: 'company'|'institution'|''`) rather than two boolean states to avoid race conditions.

5. **Migration Conflicts**: Database migrations are in `apps/{App}/migrations/` - if merge conflicts occur, reset DB and re-run migrations rather than manually editing migration files.

## Key Files Reference

- Multi-entity auth logic: `backend/apps/authentication/authenticator.py`
- API refresh interceptor: `frontend/src/libs/axios.js` (lines 24-59)
- Shared form components: `frontend/src/components/ui/`
- JWT configuration: `backend/config/settings.py` (SIMPLE_JWT dict)
- URL routing: `backend/config/urls.py` + individual app `urls.py`
- React routing: `frontend/src/routes/Routing.jsx`
