# 🎯 Introduction

This project provides a **complete architecture** for building modern Angular dashboards with:

✅ **Authentication** - Login, register, token refresh  
✅ **RBAC (Role-Based Access Control)** - Cascading permissions  
✅ **Lazy Loading** - On-demand module loading  
✅ **Type Safety** - End-to-end strict typing  
✅ **Reusable Components** - Base HTML, easily replaceable  
✅ **Best Practices** - Performance, testing, security  

🚫 BE CAREFUL 🚫
/environments folder is excluded from .gitignore just for first commit, 
DO NOT FORGOT TO EXCLUDE ENVIRONMENT VARIABLES FROM GITIGNORE 


As you can see with the structure folder below, this project is FEATURE based, so all the routes are aggregate by their feature
in this way we can have several page for each feature (such as user-profile-edit, user-profile-share etc...) without having a long
list of pages spreaded in page/ main folder
for scalable project this is an approach that i mostly appriciate.

---

## ✨ Features

### 🔐 Security
- JWT token-based authentication
- Automatic token refresh
- RBAC at route, component, and DOM levels
- XSS and CSRF protection
- Centralized error handling

### 📦 Architecture
- **Lazy-Loaded Modules**: Feature modules load on-demand
- **Separation of Concerns**: Core, Shared, Features clearly separated
- **Type-Safe**: Interfaces for every model
- **Permission Cache**: O(1) permission checks in memory

### 🎨 UI/UX
- Responsive layout (mobile-first)
- Base HTML components easily replaceable
- Directives for permission-based visibility
- Smooth animations
- Customizable themes via SCSS variables

### ⚡ Performance
- ChangeDetectionStrategy.OnPush
- Pure pipes
- OnDestroy lifecycle management
- Automatic code splitting

### 🧪 Testing
- Unit test setup with Jasmine/Karma
- E2E test examples
- Mock services provided
- 80%+ code coverage target

---

## 🏗️ Architecture Overview

### Three-Layer Architecture

```
┌─────────────────────────────────────────┐
│  Features (Auth, Dashboard, Admin)      │  ← User-facing modules
├─────────────────────────────────────────┤
│  Shared (Components, Directives, Pipes) │  ← Reusable UI elements
├─────────────────────────────────────────┤
│  Core (Services, Guards, Interceptors)  │  ← Business logic
└─────────────────────────────────────────┘
```

### Dependency Flow

```
Features → Shared ↘
                   → Core (only Core provides services)
           Shared ↗
```

**Key Rule**: Core doesn't depend on Shared or Features. Only one direction.

### Data Flow

```
HTTP Request
     ↓
Auth Interceptor (add token)
     ↓
API Call
     ↓
Error Interceptor (handle 401, 403, 5xx)
     ↓
Service (transform response)
     ↓
Component (display data)
```

---

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** v18+ (check: `node --version`)
- **npm** v9+ (check: `npm --version`)
- **Angular CLI** v18+ (`npm install -g @angular/cli@latest`)
- **Git** for version control
- **Visual Studio Code** or similar IDE
- **Basic TypeScript & Angular knowledge**

### Recommended Tools

```bash
# Angular DevTools Chrome Extension
# Redux DevTools (if using state management)
# Postman or Insomnia (for API testing)
```

---

## 🚀 Installation

### Step 1: Create New Angular Project

```bash
ng new dashboard-app
cd dashboard-app

# Choose:
# - Routing: Yes
# - Stylesheet format: SCSS
```

### Step 2: Generate Core Modules

```bash
# Generate main modules
ng generate module core --skip-tests
ng generate module shared --skip-tests
ng generate module features/auth --skip-tests
ng generate module features/dashboard --skip-tests
ng generate module features/admin --skip-tests

# Generate services
ng generate service core/services/auth --skip-tests
ng generate service core/services/permission --skip-tests
ng generate service core/services/api --skip-tests

# Generate guards
ng generate guard core/guards/auth --skip-tests
ng generate guard core/guards/permission --skip-tests

# Generate interceptors
ng generate interceptor core/interceptors/auth --skip-tests
ng generate interceptor core/interceptors/error --skip-tests
```

### Step 3: Install Dependencies

```bash
# Core dependencies (should be pre-installed)
npm list @angular/core @angular/common

# Optional but recommended
npm install rxjs tslib zone.js

# For charts (optional)
npm install recharts

# For token parsing (optional)
npm install jwt-decode

# For HTTP client (optional)
npm install axios
```

### Step 4: Verify Installation

```bash
ng serve
# Navigate to http://localhost:4200
```

---

## 📁 Project Structure

```txt
src/
├── app/
│   ├── core/                          # Singleton services, guards, interceptors and models (app-wide) and all components that dosen't are releated to DOM
│   │   ├── services/
│   │   │   ├── auth.service.ts        # Authentication logic (login/logout, token handling, current user state)
│   │   │   ├── user.service.ts        # User management calls (CRUD users, user details, etc.)
│   │   │   ├── permission.service.ts  # Roles & permissions logic (RBAC), permission checks, in-memory cache
│   │   │   └── api.service.ts         # Central HTTP wrapper (optional) to standardize API calls and responses
│   │   │
│   │   ├── validators/                # Custom validators functions for input forms
│   │   │
│   │   ├── constants/                 # There's all the constants shared in the project
│   │   │   ├── globals.constants.ts      # Such as endpoint constants
│   │   │   ├── validations.constants.ts  # Or validation messages for inputs
│   │   │   ├── messages.constants.ts     # Or alert and toast warnings error and others
│   │   ├── guards/
│   │   │   ├── auth.guard.ts          # Protect routes for authenticated users only
│   │   │   └── permission.guard.ts    # Protect routes based on permissions / roles
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts    # Automatically adds auth token (JWT) to outgoing HTTP requests
│   │   │   └── error.interceptor.ts   # Central HTTP error handling (401/403/500) + optional redirects/toasts
│   │   ├
│   │   ├── models/               # Here models can also be divided in different folders such as /classes /interfaces
│   │   │   ├── user.model.ts          # Interfaces for User entity (id, email, roles, etc.)
│   │   │   ├── permission.model.ts    # Interfaces for PermissionKey, Permission, Role, etc.
│   │   │   └── api.model.ts           # Common API response models (pagination, response wrapper, errors)
│   │   └── core.module.ts             # Optional legacy NgModule export (only if using NgModules)
│   │
│   ├── shared/                        # Reusable UI components, directives, pipes, styles (no business logic) and all stuff connected to DOM
│   │   ├── components/
│   │   │   ├── layout/                # Core application layout components (shell)
│   │   │   │   ├── main-layout/
│   │   │   │   │   ├── main-layout.component.ts
│   │   │   │   │   ├── main-layout.component.html
│   │   │   │   │   └── main-layout.component.scss
│   │   │   │   ├── sidebar/           # App navigation sidebar
│   │   │   │   ├── header/            # Topbar/header navigation
│   │   │   │   └── footer/            # Footer component
│   │   │   ├── common/                # Generic UI components used across the app
│   │   │   │   ├── button/            # Reusable button (primary/secondary, loading state, icons)
│   │   │   │   ├── card/              # Card container for dashboard widgets/forms
│   │   │   │   ├── modal/             # Standard modal dialog component
│   │   │   │   ├── spinner/           # Loading spinner component
│   │   │   │   └── breadcrumb/        # Breadcrumb navigation helper
│   │   │   └── forms/                 # Shared form controls compatible with Angular Forms
│   │   │       ├── input-field/       # Custom input component (ControlValueAccessor)
│   │   │       ├── select-field/      # Custom select component (ControlValueAccessor)
│   │   │       └── form-error/        # Standard form error renderer
│   │   ├── directives/
│   │   │   ├── has-permission.directive.ts    # Structural directive to show/hide elements based on permissions
│   │   │   └── debounce.directive.ts          # Debounce directive for inputs/buttons (prevent rapid triggers)
│   │   ├── pipes/
│   │   │   ├── safe-html.pipe.ts       # Safe HTML rendering (sanitize)
│   │   │   ├── date-format.pipe.ts     # Standard date formatting across the UI
│   │   │   └── enum-to-label.pipe.ts   # Convert enum keys into user-friendly labels
│   │   ├── mixins/                     # Reusable logic patterns for lists and UI behaviors
│   │   │   ├── paginated-list.mixin.ts # Pagination logic (page, pageSize, total)
│   │   │   ├── filterable.mixin.ts     # Filters management (search, query params, filter state)
│   │   │   └── sortable.mixin.ts       # Sorting logic (column sorting, direction)
│   │   ├── styles/
│   │   │   ├── variables.scss          # Common design variables (spacing, font sizes, colors)
│   │   │   ├── mixins.scss             # SCSS mixins for reusable style patterns
│   │   │   ├── responsive.scss         # Shared breakpoints and media helpers
│   │   │   └── global.scss             # Global shared styles used across the app
│   │   └── shared.module.ts            # Optional legacy NgModule export (only if using NgModules)
│   │
│   ├── features/                       # Feature modules (lazy-loaded) - domain/business logic lives here
│   │   ├── auth/                       # Authentication feature area
│   │   │   ├── pages/
│   │   │   │   ├── login-page/         # Login page container (form + submit logic)
│   │   │   │   ├── register-page/      # Register page container
│   │   │   │   └── forgot-password-page/ # Password recovery flow
│   │   │   ├── components/
│   │   │   │   └── auth-form/          # Shared auth form UI component (email/password fields)
│   │   │   ├── models/
│   │   │   │   └── auth.model.ts       # Auth feature models (login request/response)
│   │   │   └── auth.module.ts          # Feature module definition (lazy-loaded)
│   │   │
│   │   ├── dashboard/                  # Dashboard feature area
│   │   │   ├── pages/
│   │   │   │   ├── dashboard-home/     # Main dashboard page
│   │   │   │   ├── dashboard-analytics/# Analytics + charts page
│   │   │   │   └── dashboard-profile/  # Optional: user info widget inside dashboard
│   │   │   ├── components/
│   │   │   │   ├── stats-card/         # Metrics cards (KPIs)
│   │   │   │   ├── chart-widget/       # Charts and reports widget
│   │   │   │   └── activity-feed/      # Recent activity / logs widget
│   │   │   ├── services/
│   │   │   │   └── dashboard.service.ts# Dashboard-related API requests
│   │   │   └── dashboard.module.ts
│   │   │
│   │   ├── admin/                      # Admin-only area (restricted by roles/permissions)
│   │   │   ├── pages/
│   │   │   │   ├── users-management/   # Users list + actions (create/edit/disable)
│   │   │   │   ├── roles-permissions/  # Roles and permissions assignment page
│   │   │   │   └── system-settings/    # System settings page (configuration)
│   │   │   ├── components/
│   │   │   │   ├── user-form/          # Create/Edit user form
│   │   │   │   ├── role-editor/        # UI for managing role permissions
│   │   │   │   └── permissions-matrix/ # Table/matrix view of permissions per role
│   │   │   ├── services/
│   │   │   │   ├── user-management.service.ts # Admin-only user management API calls
│   │   │   │   └── role-management.service.ts # Admin-only role management API calls
│   │   │   └── admin.module.ts
│   │   │
│   │   └── user-profile/               # Feature area for user profile management
│   │       ├── pages/
│   │       │   ├── profile-view/       # View profile page
│   │       │   └── profile-edit/       # Edit profile page (form + update)
│   │       ├── components/
│   │       │   └── profile-form/       # Profile form UI component
│   │       ├── services/
│   │       │   └── profile.service.ts  # Profile-related API calls
│   │       └── user-profile.module.ts
│   │
│   ├── app.config.ts                   # App-wide providers (standalone bootstrap config)
│   ├── app.html                        # Root application template
│   ├── app.css                         # Root application styles
│   ├── app.route.ts                    # App routes configuration (can be renamed to app.routes.ts)
│   └── app.ts                          # Root component (AppComponent)
│
├── environments/                 # Here you can set all you env. variables for different environment, by default we have .ts and .development.ts
│   ├── environment.ts                  # Default environment values
│   ├── environment.prod.ts             # Production environment values
│   ├── environment.staging.ts          # Staging environment values
│   └── environment.development.ts      # Development environment values
│
└── assets/
    ├── icons/                          # App icons (SVG, PNG, etc.)
    ├── images/                         # Static images
    └── styles/                         # Extra static styles (optional)
```

🚫 REMEMBER if you use different environment to fix angular.json replacement of environment: 

basically andular switch between thoose two declared environments depending on which command we run 

```bash
ng serve --configuration=development
```

or
```bash
ng serve --configuration=production
```

"fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.development.ts"
    }
  ]



### Folder Meanings

| Folder | Purpose | Notes |
|--------|---------|-------|
| **core** | Singleton services, guards, interceptors | Imported ONCE in AppModule only |
| **shared** | Reusable components, directives, pipes | Can be imported in any feature module |
| **features** | User-facing modules (Auth, Dashboard, Admin) | Each module is lazy-loaded |
| **environments** | Environment-specific config | Build process swaps these files |
| **assets** | Static files (images, icons, fonts) | Served as-is, no processing |

---

## 📚 Implementation Guide

### Phase 1: Setup (2-3 hours)

1. ✅ Create new Angular project
2. ✅ Generate core/shared/features structure
3. ✅ Configure SCSS variables and global styles
4. ✅ Setup environment files
5. ✅ Create base layout components (Sidebar, Header, Footer)

### Phase 2: Authentication (4-5 hours)

1. ✅ Create User and Auth models
2. ✅ Implement AuthService (login/logout/register)
3. ✅ Create Auth Guard
4. ✅ Create Auth Interceptor
5. ✅ Build Login/Register pages
6. ✅ Implement token storage
7. ✅ Add loading and error states

### Phase 3: Permissions & Roles (3-4 hours)

1. ✅ Create Permission and Role models
2. ✅ Implement PermissionService
3. ✅ Create Permission Guard
4. ✅ Build HasPermissionDirective
5. ✅ Test with various scenarios

### Phase 4: Shared Components (3-4 hours)

1. ✅ Button Component
2. ✅ Input Field Component (with ControlValueAccessor)
3. ✅ Card Component
4. ✅ Modal Component
5. ✅ Form Error Component
6. ✅ Unit tests for each

### Phase 5: Dashboard Feature (3-4 hours)

1. ✅ Dashboard Home page
2. ✅ Dashboard Service
3. ✅ Stats widgets
4. ✅ Charts integration
5. ✅ Responsive design

### Phase 6: Admin Feature (5-6 hours)

1. ✅ User Management page
2. ✅ User Management Service
3. ✅ User Form component
4. ✅ Roles/Permissions page
5. ✅ Permissions Matrix component
6. ✅ Role assignment

### Phase 7: Polish (4-5 hours)

1. ✅ Loading states
2. ✅ Error handling
3. ✅ Toast/Snackbar service
4. ✅ Animations
5. ✅ Mobile optimization

### Phase 8: Testing & Deployment (4-5 hours)

1. ✅ Unit tests
2. ✅ E2E tests
3. ✅ Setup CI/CD
4. ✅ Production build
5. ✅ Deploy

**Total Estimated Time: 30-35 hours**

---

## 🎯 Models & Interfaces

### User Model

```typescript
// core/models/user.model.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  roles: Role[];           // User can have multiple roles
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UserRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
```

### Permission & Role Models

```typescript
// core/models/permission.model.ts
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;        // e.g., 'users', 'reports'
  action: 'read' | 'create' | 'update' | 'delete';
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isActive: boolean;
}

// Type-safe permission keys: 'users:read', 'users:create'
export type PermissionKey = `${string}:${string}`;

export interface PermissionCache {
  permissions: Set<PermissionKey>;
  roles: Map<string, Role>;
  lastUpdated: number;
}
```

**Why This Design?**
- Cascading: User → Roles → Permissions
- Type-safe: `'users:delete'` with IDE autocomplete
- Cache: O(1) permission checks
- Flexible: Add/remove roles from user without code changes

---

## 🔧 Core Services

### AuthService

**Purpose**: Handle login, logout, register, token management

**Key Methods**:
- `login(credentials)` - Authenticate user
- `register(userData)` - Create new account
- `logout()` - Clear auth state
- `getToken()` - Get stored JWT token
- `getCurrentUser()` - Get logged-in user

**Usage Example**:

```typescript
// In component
constructor(private authService: AuthService) {}

ngOnInit() {
  // Subscribe to auth state changes
  this.authService.isAuthenticated$.subscribe(isAuth => {
    console.log('User authenticated:', isAuth);
  });

  this.authService.currentUser$.subscribe(user => {
    console.log('Current user:', user);
  });
}

onLogin() {
  this.authService.login({
    email: 'user@example.com',
    password: 'password123'
  }).subscribe({
    next: (user) => console.log('Logged in:', user),
    error: (error) => console.error('Login failed:', error)
  });
}
```

### PermissionService

**Purpose**: Check user permissions efficiently

**Key Methods**:
- `hasPermission(key)` - Check single permission
- `hasAnyPermission(keys)` - OR logic
- `hasAllPermissions(keys)` - AND logic
- `hasRole(name)` - Check user role
- `getAllPermissions()` - Get all permissions

**Usage Example**:

```typescript
constructor(private permissionService: PermissionService) {}

// Check single permission
canDelete = this.permissionService.hasPermission('users:delete');

// Check multiple (AND logic)
canEditUsers = this.permissionService.hasAllPermissions([
  'users:read',
  'users:update'
]);

// Check multiple (OR logic)
isAdmin = this.permissionService.hasAnyPermission([
  'admin:access',
  'system:manage'
]);
```

---

## 🛡️ Guards & Interceptors

### AuthGuard

**Purpose**: Protect routes that require authentication

**Usage**:

```typescript
// app-routing.module.ts
{
  path: 'dashboard',
  canActivate: [AuthGuard],
  children: [...]
}
```

If user is not authenticated, they're redirected to `/auth/login`.

### PermissionGuard

**Purpose**: Protect routes based on permissions

**Usage**:

```typescript
{
  path: 'admin',
  canActivate: [PermissionGuard],
  data: {
    permissions: ['admin:access', 'users:manage']
  }
}
```

If user lacks permissions, they're redirected to `/access-denied`.

### AuthInterceptor

**Purpose**: Automatically add JWT token to all HTTP requests

**How it works**:
1. Intercepts every HTTP request
2. Gets token from AuthService
3. Adds `Authorization: Bearer <token>` header
4. Passes request to next interceptor

### ErrorInterceptor

**Purpose**: Centralized error handling

**Handles**:
- **401 Unauthorized**: Logout user, redirect to login
- **403 Forbidden**: Redirect to access denied page
- **5xx Server Errors**: Log and notify user

---

## 🎨 Shared Components

All components follow these principles:

✅ **Presentational**: No business logic, no service dependencies
✅ **Reusable**: Work with any data type via @Input/@Output
✅ **Testable**: Easy to unit test without mocks
✅ **Accessible**: Semantic HTML, ARIA labels
✅ **Responsive**: Mobile-first design

### ButtonComponent

**Inputs**:
- `label: string` - Button text
- `variant: 'primary' | 'secondary' | 'danger'` - Style
- `isDisabled: boolean` - Disable button
- `isLoading: boolean` - Show loading state

**Outputs**:
- `buttonClick: EventEmitter<void>` - Button clicked

**Usage**:

```html
<app-button
  label="Save"
  variant="primary"
  [isLoading]="isSaving"
  (buttonClick)="onSave()">
</app-button>
```

### InputFieldComponent

**Features**:
- ControlValueAccessor (works with reactive forms)
- Error display
- Label support
- Type support (text, email, password, number)

**Usage**:

```typescript
// In component
form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]]
});
```

```html
<app-input-field
  formControlName="email"
  label="Email"
  type="email"
  placeholder="user@example.com"
  [error]="getErrorMessage('email')">
</app-input-field>
```

### CardComponent

Simple wrapper for visual grouping.

```html
<app-card [title]="'User Stats'" [icon]="'📊'">
  <p>Content goes here</p>
</app-card>
```

---

## 📌 Directives

### HasPermissionDirective

**Purpose**: Show/hide elements based on user permissions

**Usage**:

```html
<!-- Show only if user can delete users -->
<button *appHasPermission="'users:delete'">Delete User</button>

<!-- Multiple permissions (AND logic) -->
<div *appHasPermission="['users:create', 'users:update']">
  Create/Edit Users
</div>

<!-- Multiple permissions (OR logic) - see source -->
<button *appHasPermission="['report:export', 'admin:access']">
  Export Report
</button>
```

**Behind the Scenes**:
1. Checks if user has permission
2. Creates/destroys element from DOM (not just hiding)
3. Updates whenever permissions change

### KeyboardShortcutDirective

```html
<button appKeyboardShortcut="s" (shortcutTriggered)="save()">
  Save (Ctrl+S)
</button>
```

### DebounceDirective

```html
<input
  (input)="search($event)"
  appDebounce
  [debounceTime]="300" />
```

---

## 🔄 Mixins - Reusable Logic

Mixins allow you to share behavior across unrelated components without inheritance.

### PaginatedListMixin

**Provides**: Page navigation, size control, calculations

```typescript
import { createPaginatedListMixin } from '@shared/mixins';

@Component({...})
export class UserListComponent 
  extends createPaginatedListMixin<User>() 
  implements OnInit 
{
  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.userService.getUsers(
      this.pagination.page,
      this.pagination.pageSize
    ).subscribe(response => {
      this.items = response.data;
      this.pagination.total = response.total;
    });
  }
}
```

**Available Methods**:
- `goToPage(page)` - Navigate to specific page
- `nextPage()` / `prevPage()` - Navigate relative
- `changePageSize(size)` - Change items per page
- `totalPages` - Get total pages
- `hasNextPage` / `hasPrevPage` - Check navigation

**Template**:

```html
<div *ngFor="let item of items">
  {{ item.name }}
</div>

<div class="pagination">
  <button (click)="prevPage()" [disabled]="!hasPrevPage">Previous</button>
  <span>Page {{ pagination.page }} of {{ totalPages }}</span>
  <button (click)="nextPage()" [disabled]="!hasNextPage">Next</button>
</div>
```

### FilterableMixin

**Provides**: Filter management

```typescript
export class ProductListComponent 
  extends createFilterableMixin<Product>() 
  implements OnInit 
{
  ngOnInit() {
    this.loadData();
  }

  onCategoryChange(category: string) {
    this.setFilter('category', category);
    // Automatically calls loadData()
  }

  onPriceRangeChange(min: number, max: number) {
    this.setFilter('priceRange', { min, max });
  }

  loadData() {
    // Use this.filterState.activeFilters
  }
}
```

**Available Methods**:
- `setFilter(key, value)` - Set filter
- `getFilter(key)` - Get filter value
- `clearFilters()` - Remove all filters

---

## 🎯 Layout & Routing

### Main Layout

The main layout wraps authenticated pages with sidebar and header.

```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        canActivate: [PermissionGuard],
        data: { permissions: ['admin:access'] },
        loadChildren: () =>
          import('./features/admin/admin.module')
            .then(m => m.AdminModule)
      },
      {
        path: '',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

**Key Points**:
- Auth routes NOT under MainLayout (users can't see sidebar while logging in)
- Protected routes under MainLayout with AuthGuard
- Admin routes have additional PermissionGuard
- Lazy loading with `loadChildren`

---

## 📦 Feature Modules

Each feature is a self-contained module with pages, components, and services.

### Auth Module Structure

```
features/auth/
├── pages/
│   ├── login-page/
│   ├── register-page/
│   └── forgot-password-page/
├── components/
│   └── auth-form/
├── models/
│   └── auth.model.ts
├── auth-routing.module.ts
└── auth.module.ts
```

### Dashboard Module Structure

```
features/dashboard/
├── pages/
│   ├── dashboard-home/
│   ├── dashboard-analytics/
│   └── dashboard-profile/
├── components/
│   ├── stats-card/
│   ├── chart-widget/
│   └── activity-feed/
├── services/
│   └── dashboard.service.ts
├── dashboard-routing.module.ts
└── dashboard.module.ts
```

### Admin Module Structure

```
features/admin/
├── pages/
│   ├── users-management/
│   ├── roles-permissions/
│   └── system-settings/
├── components/
│   ├── user-form/
│   ├── role-editor/
│   └── permissions-matrix/
├── services/
│   ├── user-management.service.ts
│   └── role-management.service.ts
├── admin-routing.module.ts
└── admin.module.ts
```

---




### Add a New Feature Module

```bash
# Generate module
ng generate module features/new-feature --routing

# Generate pages and components
ng generate component features/new-feature/pages/new-page
ng generate component features/new-feature/components/new-component

# Generate service
ng generate service features/new-feature/services/new-feature
```

Then update `app-routing.module.ts`:

```typescript
{
  path: 'new-feature',
  loadChildren: () =>
    import('./features/new-feature/new-feature.module')
      .then(m => m.NewFeatureModule)
}
```

### Add Permission to User

```typescript
// In admin panel
const userWithNewPermission = {
  ...user,
  roles: [
    {
      ...role,
      permissions: [
        ...role.permissions,
        { id: 'new-id', name: 'new-permission', resource: 'resource', action: 'read' }
      ]
    }
  ]
};
```

### Create a Custom Pipe

```typescript
// shared/pipes/custom.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

// Add to shared.module.ts declarations and exports
```

### Create a Custom Directive

```typescript
// shared/directives/custom.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = null;
  }
}
```

---


## 📝 Documentation Standards

### Component Documentation

```typescript
/**
 * Button Component
 * 
 * A reusable button component with multiple variants
 * 
 * @example
 * <app-button 
 *   label="Click me"
 *   variant="primary"
 *   (buttonClick)="onClick()">
 * </app-button>
 */
@Component({...})
export class ButtonComponent {
  /** Button display text */
  @Input() label: string = 'Click me';

  /** Visual variant */
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';

  /** Emitted when button is clicked */
  @Output() buttonClick = new EventEmitter<void>();
}
```

---

## 🤔 FAQ

**Q: How do I add a new user role?**
A: Create new role object with permissions, assign to user. PermissionService automatically caches it.

**Q: Can I use Bootstrap/Material with this template?**
A: Yes! Components are HTML-based and easily replaceable. Install the library and swap components.

**Q: How do I handle token refresh?**
A: Implement refresh token endpoint in backend, call from ErrorInterceptor on 401.

**Q: Is this suitable for large applications?**
A: Yes! Architecture scales to 100+ feature modules with proper organization.

**Q: How do I implement real-time updates?**
A: Add WebSocket/SignalR integration in services using RxJS.

**Q: Can I use this with state management libraries like NgRx?**
A: Yes! The architecture is compatible. Replace BehaviorSubjects with store selectors.

**Q: How do I test HTTP interceptors?**
A: Use `HttpClientTestingModule` and `HttpTestingController` as shown in testing section.

**Q: What's the recommended way to handle errors?**
A: Use ErrorInterceptor for HTTP errors, custom error classes for domain errors.


## 🎉 Conclusion

This template provides everything needed to build professional Angular dashboards. It follows enterprise best practices while remaining accessible to developers of all levels.

### Key Takeaways

✅ **Architecture**: Clean separation of concerns (Core, Shared, Features)  
✅ **Security**: JWT authentication, RBAC, permission caching  
✅ **Performance**: Lazy loading, OnPush detection, pure components  
✅ **Scalability**: Easy to add features without breaking existing code  

---

## 📚 Additional Resources

### Official Documentation
- [Angular.io](https://angular.io)
- [RxJS Docs](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org)

### Community
- [Angular Community](https://angular.io/about)
- [Stack Overflow Angular Tag](https://stackoverflow.com/questions/tagged/angular)
- [Angular Subreddit](https://reddit.com/r/Angular2)

### Tools
- [Angular DevTools](https://angular.io/guide/devtools)
- [VS Code Angular Extensions](https://marketplace.visualstudio.com/search?term=angular)
- [WebStorm IDE](https://www.jetbrains.com/webstorm/)

---

```

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

### Resources

- [Angular Official Docs](https://angular.io)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Testing Guide](https://angular.io/guide/testing)


## 🎉 Conclusion

This template provides a **production-ready foundation** for Angular dashboards. It's designed to scale from 1 developer to large teams.

**Key Takeaways**:
- ✅ Clean architecture (Core, Shared, Features)
- ✅ Type-safe throughout (TypeScript)
- ✅ Secure authentication and authorization
- ✅ Efficient permission checking (O(1) cache)
- ✅ Reusable components and mixins
- ✅ Comprehensive testing setup
- ✅ CI/CD ready

Happy coding! 🚀

---


**Last Updated**: January 2025  
**Angular Version**: 18+  
**Node Version**: 18+  
**TypeScript Version**: 5.2+  
**License**: MIT  
