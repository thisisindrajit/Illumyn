# Technology Stack

## Frontend
- **Framework**: Next.js 15.4.1 with React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with custom animations
- **UI Components**: Radix UI primitives, custom shadcn/ui components
- **Icons**: Lucide React, Remix Icons
- **Theme**: next-themes for dark/light mode support
- **Authentication**: better-auth with Google OAuth
- **Database**: PostgreSQL with pg driver
- **Notifications**: Sonner for toast notifications

## Backend
- **Framework**: Spring Boot 3.5.3
- **Language**: Java 24
- **Build Tool**: Maven
- **Package**: com.illumyn.api

## AI Agents
- **Language**: Python
- **Environment**: Virtual environment (.venv)
- **Structure**: Multi-tool agent architecture

## Common Commands

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development
```bash
cd api
mvn spring-boot:run  # Start Spring Boot application
mvn clean install   # Build and install dependencies
mvn test            # Run tests
```

### AI Agents
```bash
cd ai-agents
source .venv/bin/activate  # Activate virtual environment
python -m multi_tool_agent.agent  # Run agent
```

## Development Setup
- Frontend runs on Next.js development server (typically port 3000)
- Backend runs on Spring Boot (typically port 8080)
- Database: PostgreSQL with SSL enabled
- Environment variables required for database connection and OAuth