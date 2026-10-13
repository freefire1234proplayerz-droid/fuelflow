# FuelFlow

**Find fuel. Skip the queue.**

FuelFlow is a petrol pump discovery and recommendation platform that helps users find nearby fuel stations, compare estimated waiting times, check fuel availability, and choose a suitable station.

## Planned features

- Nearby fuel station discovery
- Petrol, diesel, CNG, and EV charging filters
- Crowd and waiting-time estimates
- User crowd reports
- Station comparisons and recommendations
- Real-time station updates
- User, station-owner, and admin dashboards

## Technology

- React and TypeScript
- Node.js and Express
- PostgreSQL and Prisma
- Socket.IO

## Development status

Monorepo foundation (Phase 0 complete): pnpm workspaces, Turborepo, shared types package.
Backend API and React frontend not yet implemented.

Crowd information will be labelled as simulated until verified live data sources are integrated.

## Getting Started

### Prerequisites

- Node.js 22.x
- pnpm 12.x (`npm install -g pnpm@12`)
- PostgreSQL 16+ with PostGIS extension (required for Phase 1+)

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env
# Edit .env with your configuration

# Build all packages
pnpm build

# Run development servers (when apps are implemented)
pnpm dev
```

### Workspace Structure

```
fuelflow/
├── apps/
│   ├── api/          # Express backend (Phase 1)
│   └── web/          # React + Vite frontend (Phase 2)
├── packages/
│   └── shared/       # Shared types, validators, utilities (@fuelflow/shared)
├── turbo.json        # Turborepo pipeline configuration
├── pnpm-workspace.yaml
└── package.json
```

### Available Scripts

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `pnpm dev`         | Start all development servers |
| `pnpm build`       | Build all packages            |
| `pnpm lint`        | Lint all packages             |
| `pnpm format`      | Format code with Prettier     |
| `pnpm typecheck`   | Type-check all packages       |
| `pnpm test`        | Run tests                     |
| `pnpm db:generate` | Generate Prisma client        |
| `pnpm db:push`     | Push schema to database       |
| `pnpm db:studio`   | Open Prisma Studio            |

### Environment Variables

See `.env.example` for all required and optional variables.
