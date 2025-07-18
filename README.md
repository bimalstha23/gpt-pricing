This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
