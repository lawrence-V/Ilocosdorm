<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before touching Next-specific APIs, routing, caching, metadata, Server Actions, middleware, or config. Heed deprecation notices.


# React + Next.js Code Conventions

## Tech Stack

- Use React with Next.js
- Use TypeScript
- Use functional components only
- Use React Hooks
- Use Next.js App Router
- Use React Hook Form for forms
- Use Zod for validation
- Use Tailwind CSS
- Use shadcn/ui as the default UI library. This project is configured with `components.json`.
- Use Server Components by default
- Use Client Components only when necessary

---

# Folder Structure

This project intentionally does not use a `src/` directory. Keep source folders at the project root.

```
app/
components/
├── ui/
└── common/
features/
hooks/
services/
utils/
lib/
types/
constants/
styles/
assets/
```

---

# Folder Responsibilities

## app/

Contains route pages, layouts, loading, error, and server components.

Examples

```
app/
├── page.tsx
├── login/
│   └── page.tsx
└── dashboard/
    └── page.tsx
```

Page components should only compose features.
Keep business logic, large UI sections, and reusable component implementation out of page files.

---

## components/

Reusable components shared across the application.

```
components/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── card.tsx
└── common/
    ├── Header.tsx
    ├── Footer.tsx
    └── PageContainer.tsx
```

---

## features/

Everything related to one feature stays together.

```
features/
└── auth/
    ├── components/
    ├── hooks/
    ├── schemas/
    ├── services/
    ├── types/
    └── LoginFeature.tsx
```

Each feature owns its:

- Components
- Hooks
- Validation
- Services
- Types

---

## hooks/

Reusable custom hooks.

Examples

```
useAuth.ts
useDebounce.ts
usePagination.ts
```

---

## services/

API requests and external services.

Examples

```
authService.ts
userService.ts
attendanceService.ts
```

Never call APIs directly inside UI components.

---

## utils/

Pure helper functions.

Examples

```
formatDate.ts
formatCurrency.ts
cn.ts
```

---

## lib/

Application libraries and configurations.

Examples

```
axios.ts
auth.ts
queryClient.ts
```

---

## types/

Shared TypeScript types.

Examples

```
User.ts
Attendance.ts
ApiResponse.ts
```

---

## constants/

Application constants.

Examples

```
API_URL
ROUTES
DEFAULT_PAGE_SIZE
```

---

# Naming Convention

## Components

PascalCase

```
UserCard.tsx
LoginForm.tsx
DashboardPage.tsx
```

---

## Hooks

camelCase starting with "use"

```
useAuth.ts
useUsers.ts
```

---

## Services

camelCase

```
authService.ts
userService.ts
```

---

## Types

PascalCase

```
User
LoginFormData
Attendance
```

---

## Constants

UPPER_SNAKE_CASE

```
API_URL
DEFAULT_PAGE_SIZE
```

---

# React Design Pattern

## Follow Single Responsibility Principle (SRP)

A component should only have one responsibility.

If it starts doing multiple things, split it.

A component should delegate responsibilities to:

- Feature Components
- UI Components
- Custom Hooks
- Services
- Utility Functions

---

# Component Layers

## 1. Page Components

Responsible only for routing and page composition.

Responsibilities

- Compose features
- Fetch server data when appropriate
- Handle page metadata
- Do NOT contain business logic
- Do NOT contain reusable UI

Example

```tsx
export default async function LoginPage() {
  return <LoginFeature />;
}
```

---

## 2. Feature Components

Responsible for one business feature.

Examples

```
LoginFeature
AttendanceFeature
UserManagementFeature
```

Responsibilities

- Connect forms
- Connect hooks
- Connect services
- Manage feature state
- Compose UI components

---

## 3. UI Components

Reusable presentation components.

Examples

```
Button
Input
Card
Badge
Dialog
Table
```

Rules

- No business logic
- No API calls
- Receive props only
- Highly reusable

---

# Component Rules

- One component per file
- Keep components focused
- Prefer composition over large components
- Do not duplicate UI
- Do not place API logic inside UI
- Do not place business logic inside reusable UI
- Keep files small
- Extract reusable logic into hooks
- Extract reusable UI into components
- Extract API calls into services
- Avoid deeply nested JSX
- Use TypeScript everywhere
- Never use `any`

---

# shadcn/ui Rules

- Use shadcn/ui as the default component library.
- Never recreate a component that already exists in shadcn/ui.
- Extend shadcn/ui components instead of modifying them directly.
- Keep generated shadcn/ui components inside `components/ui`.
- Feature-specific wrappers should live inside their respective feature folders.
- Use the project's configured shadcn aliases:
  - UI components: `@/components/ui/...`
  - utilities: `@/lib/utils`
  - hooks: `@/hooks/...`
- Use Lucide icons, matching `components.json`.
- Prefer semantic shadcn/Tailwind tokens and component variants over raw colors.
- Check component docs or existing component files before using unfamiliar shadcn APIs.

Example

```
components/ui/button.tsx
components/ui/input.tsx

features/auth/components/LoginButton.tsx
```

---

# State Management

Use

- useState
- useReducer

for local state.

Use

- Context
- Zustand

only for global state.

Avoid prop drilling.

---

# Server vs Client Components

Prefer Server Components.

Use `"use client"` only when needed.

Examples

- useState
- useEffect
- Event handlers
- React Hook Form
- Browser APIs
- Zustand
- Client-side interactions

---

# API Rules

- Keep API calls inside `services/`
- Use async/await
- Handle loading
- Handle errors
- Handle success states
- Never hardcode API URLs
- Use environment variables
- Return typed responses

---

# Form Rules

- Use React Hook Form
- Validate with Zod
- Keep schemas near the feature
- Show user-friendly validation errors
- Never manually validate everything with many `if` statements

Example

```
features/auth/
├── LoginForm.tsx
└── schemas/
    └── loginSchema.ts
```

---

# Styling Rules

- Use Tailwind CSS
- Keep spacing consistent
- Prefer utility classes
- Avoid duplicate styles
- Use reusable components
- Avoid excessively long `className` strings
- Extract repeated UI into components

---

# Imports

Prefer absolute imports using the configured `@/*` TypeScript path alias.

```
import { Button } from "@/components/ui/button";
import { login } from "@/services/authService";
import type { User } from "@/types/User";
```

Import order

1. React / Next
2. Third-party libraries
3. Internal modules
4. Types
5. Styles

---

# Verification

- Run `npm run lint` after code changes.
- Run `npm run build` after changing routes, layouts, metadata, middleware, config, or server/client boundaries.
- If verification cannot be run, explain why and what risk remains.

---

# Data Fetching

- Fetch data in Server Components whenever possible.
- Keep data fetching outside reusable UI components.
- Pass data down through props.
- Use Client Components only for interactive functionality.

---

# File Size Guidelines

- Components should ideally stay under 200 lines.
- Split large components.
- Move business logic into hooks.
- Move API calls into services.
- Move reusable UI into components.

---

# AI Instructions

When generating code:

- Follow this project structure.
- Follow Single Responsibility Principle.
- Use React + Next.js App Router.
- Use TypeScript.
- Use functional components.
- Use Server Components by default.
- Use Client Components only when required.
- Use shadcn/ui before creating custom UI.
- Do not duplicate existing shadcn/ui components.
- Keep business logic inside features.
- Keep API calls inside services.
- Keep reusable logic inside hooks.
- Keep reusable UI inside components.
- Use React Hook Form with Zod for forms.
- Never use `any`.
- Use proper TypeScript types.
- Explain where every generated file should be placed.
- Write clean, modular, scalable, and beginner-friendly code.

---

# Golden Rule

**Page = Route**

↓

**Feature = Business Logic**

↓

**Hook = Reusable Logic**

↓

**Service = API**

↓

**UI = Presentation**

Keep each layer focused on one responsibility.
<!-- END:nextjs-agent-rules -->
