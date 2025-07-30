# Project Structure

## Root Level Organization
```
├── frontend/          # Next.js React application
├── api/              # Spring Boot Java API
├── ai-agents/        # Python AI agent modules
├── database/         # Database schemas and ERD
└── .kiro/           # Kiro IDE configuration and steering
```

## Frontend Structure (`frontend/`)
- **App Router**: Uses Next.js 13+ app directory structure
- **Components**: Organized by feature/type in `src/components/`
  - `ui/` - Reusable UI primitives (buttons, cards, etc.)
  - `navigation/` - Navigation components (TopBar, MainNavigation, etc.)
  - `content/` - Content-specific components (BlockCard, TrendingSection)
  - `forms/` - Form components and inputs
  - `holders/` - Page layout containers
  - `icons/` - Custom icon components
- **Pages**: App router pages in `src/app/`
  - `auth/` - Authentication pages
  - `user/` - User dashboard and profile
  - `block/` - Learning block pages
- **Library**: Shared utilities in `src/lib/`
  - `auth.ts` - Authentication configuration
  - `utils.ts` - Common utilities
- **Constants**: Application constants in `src/constants/`

## Backend Structure (`api/`)
- **Maven Standard**: Follows Maven project structure
- **Package**: `com.illumyn.api`
- **Main**: Application entry point in `src/main/java/`
- **Resources**: Configuration in `src/main/resources/`
- **Tests**: Unit tests in `src/test/java/`

## AI Agents Structure (`ai-agents/`)
- **Multi-tool Agent**: Main agent module in `multi_tool_agent/`
- **Virtual Environment**: Python dependencies in `.venv/`
- **Environment**: Configuration in `.env` files

## Naming Conventions
- **Components**: PascalCase (e.g., `TopBar.tsx`, `BlockCard.tsx`)
- **Files**: kebab-case for non-components (e.g., `auth-client.ts`)
- **Directories**: kebab-case (e.g., `better-auth_migrations/`)
- **API Routes**: Next.js convention with brackets for dynamic routes

## Import Patterns
- Use `@/` alias for absolute imports from `src/`
- Barrel exports via `index.ts` files for clean imports
- Component imports use explicit file extensions