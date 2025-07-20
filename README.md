## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (recommended) or npm/yarn
- **Docker** and **Docker Compose** (for database services)
- **Git** (for version control)

### Quick Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bimalstha23/gpt-pricing.git
   cd gpt-pricing
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   # Database
   DATABASE_URL="postgresql://postgres:password@localhost:5432/gpt_pricing"

   # Redis
   REDIS_URL="redis://localhost:6379"

   # Optional: Add your own configuration
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Start the database services:**

   ```bash
   pnpm docker:dev:postgres
   pnpm docker:dev:redis
   ```

5. **Run database migrations:**

   ```bash
   pnpm db:migrate
   ```

6. **Seed the database with sample data:**

   ```bash
   curl -X POST http://localhost:3000/api/pricing/seed
   ```

7. **Start the development server:**

   ```bash
   pnpm dev
   ```

8. **Open your browser:**

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Alternative Setup Options

#### Option 1: Full Docker Development

Run everything in containers:

```bash
pnpm docker:dev
```

This starts PostgreSQL, Redis, and the Next.js app in Docker containers with hot reload.

#### Option 2: Local Development with External Databases

If you have PostgreSQL and Redis running elsewhere:

```bash
# Update your .env.local with external database URLs
pnpm db:migrate
pnpm dev
```

### Development Workflow

1. **Make changes** to your code
2. **View changes** at http://localhost:3000 (auto-refreshes)
3. **Access database** via Prisma Studio: `pnpm db:studio`
4. **View API endpoints:**
   - GET `/api/pricing` - Fetch pricing data
   - POST `/api/pricing/seed` - Seed database
   - GET `/api/pricing/status` - redis expiration check
   - DELETE `/api/pricing/clear-cache` - Clear Redis cache

### Troubleshooting

**Database connection issues:**

```bash
# Check if PostgreSQL is running
pnpm docker:dev:postgres

# Verify connection
pnpm db:studio
```

**Redis connection issues:**

```bash
# Check if Redis is running
pnpm docker:dev:redis

```

**Port conflicts:**

- PostgreSQL: Default port 5432
- Redis: Default port 6379
- Next.js: Default port 3000

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Inter](https://fonts.google.com/specimen/Inter), a modern sans-serif font family.

## Project Structure

```
gpt-pricing/
├── public/                           # Static assets
│   ├── images/
│   │   ├── pricing/                 # Pricing modal images
│   │   │   ├── default.svg          # Default pricing image
│   │   │   └── feature-*.svg        # Feature hover images
│   │   └── MusicGPT.png            # Logo asset
│   └── *.svg                        # Icon assets
├── prisma/                          # Database configuration
│   ├── schema.prisma               # Database schema definition
│   └── migrations/                 # Database migration files
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx             # Root layout with modal slot
│   │   ├── page.tsx               # Main landing page
│   │   ├── globals.css            # Global styles and CSS variables
│   │   ├── @modal/                # Parallel route for modals
│   │   │   ├── default.tsx        # Empty modal state
│   │   │   └── (.)pricing/        # Intercepted pricing route
│   │   │       └── page.tsx       # Pricing modal content
│   │   ├── pricing/               # Direct pricing page
│   │   │   └── page.tsx           # Standalone pricing page
│   │   └── api/                   # API routes
│   │       └── pricing/           # Pricing API endpoints
│   │           ├── route.ts       # GET pricing data
│   │           ├── seed/
│   │           │   └── route.ts   # POST seed database
│   │           ├── status/
│   │           │   └── route.ts   # GET health check
│   │           └── clear-cache/
│   │               └── route.ts   # DELETE cache
│   ├── components/                 # React components
│   │   ├── Header.tsx             # Navigation header
│   │   ├── pricing/               # Pricing-specific components
│   │   │   ├── PriceCard.tsx      # Main pricing card with animations
│   │   │   ├── PriceDetailCard.tsx # Individual plan details
│   │   │   └── PricingDialog.tsx  # Modal wrapper
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── button.tsx         # Button component
│   │   │   ├── badge.tsx          # Badge component
│   │   │   ├── dialog.tsx         # Dialog/modal primitives
│   │   │   ├── skeleton.tsx       # Loading skeleton
│   │   │   ├── tabs.tsx           # Custom tabs with badges
│   │   │   ├── flip-text.tsx      # Animated text component
│   │   │   └── pricing-dialog-skeleton.tsx # Pricing modal skeleton
│   │   ├── effects/               # Animation components
│   │   │   └── motion-highlight.tsx # Motion highlight effects
│   │   └── skeletons/             # Loading state components
│   │       └── pricing-skeleton.tsx # General pricing skeleton
│   ├── hooks/                     # Custom React hooks
│   │   └── useClickOutside.tsx    # Click outside detection
│   ├── lib/                       # Utility libraries
│   │   ├── prisma.ts             # Prisma client configuration
│   │   ├── redis.ts              # Redis client setup
│   │   └── utils.ts              # General utilities
│   └── services/                  # Business logic
│       └── pricing.ts            # Pricing service functions
├── .env.local                     # Environment variables
├── .gitignore                     # Git ignore rules
├── .eslintrc.json                # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── commitlint.config.js          # Commit message rules
├── docker-compose.dev.yml        # Docker development setup
├── Dockerfile.dev                # Docker development image
├── components.json               # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── pnpm-lock.yaml              # Package lock file
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

### Key Directories Explained

#### `/src/app/` - App Router Structure

- **Parallel Routes**: `@modal/` directory enables modal overlays
- **Intercepted Routes**: `(.)pricing/` intercepts navigation for modal display
- **API Routes**: RESTful endpoints for pricing data and cache management

#### `/src/components/` - Component Architecture

- **Domain Components**: `pricing/` folder contains business logic components
- **UI System**: `ui/` folder houses reusable design system components
- **Effects**: `effects/` contains animation and visual effect components
- **Loading States**: `skeletons/` provides consistent loading experiences

#### `/src/lib/` - Infrastructure

- **Database**: Prisma client with connection pooling
- **Caching**: Redis configuration with ioredis
- **Utilities**: Common helper functions and type definitions

#### `/prisma/` - Database Management

- **Schema**: Type-safe database schema definition
- **Migrations**: Version-controlled database changes

## Project Architecture

### Frontend Components

This project features a sophisticated pricing modal system with advanced UI components:

### Parallel Routes

The application uses Next.js 15 parallel routes for advanced modal handling:

```
src/app/
├── layout.tsx                 # Root layout with modal slot
├── page.tsx                   # Main application page
├── @modal/                    # Parallel route for modals
│   ├── default.tsx           # Default modal state (empty)
│   └── (.)pricing/           # Intercepted route for pricing modal
│       └── page.tsx          # Pricing modal content
└── pricing/
    └── page.tsx              # Direct pricing page (fallback)
```

#### How Parallel Routes Work

- **Modal Overlay**: When navigating to `/pricing`, the route is intercepted and displays as a modal overlay
- **Direct Access**: Direct navigation to `/pricing` shows the full page version
- **Server Components**: Modals use React Suspense with skeleton loading states
- **URL Persistence**: Modal state is preserved in the URL for sharing and back navigation

### API Endpoints

#### Pricing API (`/api/pricing`)

**GET `/api/pricing`**

- Fetches all pricing plans with Redis caching (2-minute expiry)
- Returns: Array of pricing plans with features
- Cache: Redis with automatic invalidation

**POST `/api/pricing/seed`**

- Seeds the database with sample pricing data
- Creates plans: Personal, Pro, Enterprise
- Includes features with image URLs for hover effects

**GET `/api/pricing/status`**

- Health check endpoint for pricing service
- Returns: Database connection status and cached data info

**DELETE `/api/pricing/clear-cache`**

- Clears Redis cache for pricing data
- Forces fresh data fetch on next request

#### Response Format

```typescript
interface PricingData {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingType: 'MONTHLY' | 'YEARLY';
  popular: boolean;
  imageUrl?: string;
  features: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
}
```

### Database Schema

```prisma
model Plan {
  id          String      @id @default(cuid())
  name        String
  price       Decimal
  currency    String      @default("USD")
  billingType BillingType @default(MONTHLY)
  popular     Boolean     @default(false)
  imageUrl    String?
  features    Feature[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Feature {
  id       String  @id @default(cuid())
  name     String
  imageUrl String?
  planId   String
  plan     Plan    @relation(fields: [planId], references: [id], onDelete: Cascade)
}

enum BillingType {
  MONTHLY
  YEARLY
}
```

### Performance Optimizations

- **Redis Caching**: 2-minute cache expiry for pricing data
- **Lazy Loading**: Images load on viewport intersection
- **Skeleton Loading**: Matches real component structure
- **Motion Optimization**: GPU-accelerated animations
- **Code Splitting**: Dynamic imports for modal components

## Code Quality & Formatting

This project is configured with comprehensive code quality tools:

### ESLint

ESLint is configured with the following plugins and rules:

- **Next.js** - Core web vitals and TypeScript support
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Prettier** - Code formatting enforcement
- **Simple Import Sort** - Automatic import organization
- **React** - React-specific linting rules
- **Import** - ES6+ import/export linting

### Prettier

Prettier is integrated with ESLint to ensure consistent code formatting across the project.

### Available Commands

```bash
# Run ESLint to check for issues
pnpm lint

# Run ESLint and automatically fix issues
pnpm lint --fix

# Format code with Prettier
pnpm prettier --write .

# Check if code is formatted correctly
pnpm prettier --check .
```

### Key Features

- **Automatic import sorting** - Imports are automatically organized alphabetically
- **TypeScript support** - Full TypeScript linting with recommended rules
- **React best practices** - Enforces React coding standards
- **Prettier integration** - Consistent code formatting
- **Custom rules** - Tailored rules for optimal development experience

## Git Hooks & Commit Standards

This project uses Git hooks to ensure code quality and consistent commit messages:

### Commitlint

Enforces conventional commit message format for consistent project history.

#### Commit Message Format

```
<type>: <description>

Examples:
feat: add user authentication
fix: resolve navigation bug
docs: update README with setup instructions
style: format code with prettier
refactor: simplify data fetching logic
test: add unit tests for user service
chore: update dependencies
```

#### Available Types

- `feat` - New features
- `fix` - Bug fixes
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding/updating tests
- `build` - Build system changes
- `ci` - CI/CD changes
- `chore` - Other changes (dependencies, etc.)
- `revert` - Reverting previous commits

### Lint-Staged

Runs linting and formatting only on staged files for faster pre-commit checks.

#### What it does

- **JavaScript/TypeScript files**: Runs ESLint with auto-fix + Prettier formatting
- **Other files** (JSON, MD, CSS, etc.): Runs Prettier formatting
- **Staged files only**: Only processes files that are staged for commit

#### Manual Usage

```bash
# Run lint-staged manually
npx lint-staged

# Or run automatically on commit
git add .
git commit -m "feat: add new feature"  # Runs automatically
```

### Git Workflow

1. **Stage files**: `git add .`
2. **Pre-commit hook**: Runs `lint-staged` (ESLint + Prettier on staged files)
3. **Commit**: `git commit -m "feat: your message"`
4. **Commit-msg hook**: Validates commit message format with commitlint

## Docker Development Environment

### Prerequisites

- Docker and Docker Compose
- Node.js and pnpm (for local development)

### Quick Start

#### Option 1: Full Docker Development (Recommended)

1. **Start the complete development environment:**

   ```bash
   pnpm docker:dev
   ```

2. **Open the application:**
   - Visit: http://localhost:3000
   - Database: PostgreSQL on port 5432
   - Redis: Available on port 6379

#### Option 2: Database-Only Docker

1. **Start only the database services:**

   ```bash
   pnpm docker:dev:postgres
   pnpm docker:dev:redis
   ```

2. **Run database migrations:**

   ```bash
   pnpm db:migrate
   ```

3. **Start the Next.js development server locally:**

   ```bash
   pnpm dev
   ```

4. **Open the application:**
   - Visit: http://localhost:3000
   - Database: PostgreSQL on port 5432
   - Redis: Available on port 6379

### Available Scripts

- `pnpm docker:dev` - Start complete development environment (PostgreSQL, Redis, and Next.js)
- `pnpm docker:dev:app` - Start Next.js app container only
- `pnpm docker:dev:postgres` - Start PostgreSQL container only
- `pnpm docker:dev:redis` - Start Redis container only
- `pnpm docker:dev:down` - Stop all containers
- `pnpm db:migrate` - Run database migrations
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:studio` - Open Prisma Studio

### Development Notes

- The full Docker environment includes hot reload for file changes
- Database migrations are automatically run when the app container starts
- All services include health checks for reliable startup

### Individual Service Management

You can now start services individually for more granular control:

```bash
# Start only PostgreSQL
pnpm docker:dev:postgres

# Start only Redis
pnpm docker:dev:redis

# Start only the Next.js app (requires postgres to be running)
pnpm docker:dev:app

# Start all services
pnpm docker:dev

# Stop all services
pnpm docker:dev:down
```

**Common Development Patterns:**

1. **Database development:** Start only postgres and work with Prisma Studio

   ```bash
   pnpm docker:dev:postgres
   pnpm db:studio
   ```

2. **Cache development:** Start postgres and redis, run app locally

   ```bash
   pnpm docker:dev:postgres
   pnpm docker:dev:redis
   pnpm dev
   ```

3. **Full containerized development:** Everything in Docker
   ```bash
   pnpm docker:dev
   ```

## Tech Stack

### Core Technologies

- **Next.js 15** - App Router with parallel routes and intercepted routes
- **TypeScript** - Full type safety throughout the application
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **Framer Motion** - Advanced animations and gesture handling
- **Prisma ORM** - Type-safe database operations with PostgreSQL
- **Redis** - High-performance caching with ioredis
- **shadcn/ui** - Modern, accessible component library

### Development Tools

- **ESLint** - Code linting with TypeScript and React rules
- **Prettier** - Code formatting and consistency
- **Commitlint** - Conventional commit message enforcement
- **Lint-staged** - Pre-commit hooks for code quality
- **Docker** - Containerized development environment
- **Prisma Studio** - Database management interface

### Key Features

- **Server Components** - Optimized performance with React Server Components
- **Parallel Routes** - Advanced modal management with URL persistence
- **Intercepted Routes** - Seamless modal navigation
- **Suspense Boundaries** - Smooth loading states with skeletons
- **Motion Animations** - 3D transforms and spring physics
- **Lazy Loading** - Performance-optimized image loading
- **Redis Caching** - Sub-second API response times
- **Type Safety** - End-to-end TypeScript integration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
