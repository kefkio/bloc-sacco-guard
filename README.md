
Bloc Sacco Guard
A React + TypeScript + Vite web app styled with Tailwind CSS and shadcn-ui components. It includes pages for dashboarding, loan applications, guarantors, and savings, with routing via React Router.

Prerequisites
- Node.js 18+ (recommended LTS)
- npm 9+ (or pnpm/yarn/bun if you prefer)
Check versions:
node -v
npm -v



Getting Started
Install dependencies:
npm install


Start the development server:
npm run dev


By default, the app runs at http://localhost:8080.

Development Steps
- Create a feature branch
git checkout -b feature/<short-description>
- Run the dev server and iterate
npm run dev
- Build UI/features
- Add components under src/components/ (use shadcn-ui primitives in src/components/ui)
- Add pages under src/pages/ and register routes in App.tsx (React Router)
- Use alias imports: import { X } from '@/components/...';
- Style with Tailwind utility classes
- Forms & validation (optional)
- Use react-hook-form + zod (@hookform/resolvers/zod) for typed validation
- Data fetching (optional)
- @tanstack/react-query is available for server-state and caching
- Lint before committing
npm run lint
- Build to verify production output
npm run build
- Commit and push
git add .
git commit -m "feat: <summary>"
git push -u origin feature/<short-description>



Build & Preview
- Build production assets:
npm run build


- Preview the production build locally:
npm run preview



Available Scripts
- npm run dev: Start Vite dev server
- npm run build: Build for production
- npm run build:dev: Build using development mode
- npm run preview: Preview production build
- npm run lint: Lint the project

Tech Stack
- React 18
- TypeScript 5
- Vite 5 (React SWC plugin)
- Tailwind CSS (+ @tailwindcss/typography)
- shadcn-ui (Radix UI primitives)
- React Router v6
- wagmi + viem for wallet and on-chain calls

Project Structure
bloc-sacco-guard/
  public/                # Static assets
  src/
    assets/              # Images and media
    components/          # Reusable UI and feature components
      ui/                # shadcn-ui components
    hooks/               # Reusable React hooks
    lib/                 # Utilities/helpers
    pages/               # Route-level pages
    main.tsx             # App entry
    App.tsx              # Router and layout wiring


Key routes (see src/pages):
- / → Index
- /dashboard → DashboardPage
- /loan-application → LoanApplicationPage
- /guarantor → GuarantorPage
- /savings → SavingsPage
- Fallback → NotFound

Configuration
- vite.config.ts: Dev server listens on :: (all interfaces) at port 8080; alias @ → ./src
- tsconfig.json: Base config with path mapping @/* → src/*
- tailwind.config.ts: Tailwind setup and shadcn-ui presets
- src/lib/web3.ts: wagmi config (default Base Sepolia). Change chains/transports as needed
- Set env var VITE_MEMBER_REGISTRY_ADDRESS to your deployed MemberRegistry address for the Register button on Dashboard
- Set env var VITE_SAVINGS_POOL_ADDRESS to your deployed SavingsPool address for on-chain deposits/withdrawals on Savings

Backend API (optional)
- Location: server/
- Setup:
cd server
npm install
npm run dev
# API at http://localhost:4000/health
- Env: create server/.env with RPC_URL if you want a custom RPC.

Troubleshooting
- Port busy: run with a different port
npm run dev -- --port 3000
- Windows/PowerShell execution policy: If scripts fail to run, start your shell as Administrator or use Git Bash
- OneDrive paths: If you see file-watch issues, consider moving the project outside OneDrive-synced folders or increase watch limits
- Node version issues: Ensure Node 18+; clear installs and re-install if you see ESM or Vite-related errors
rm -rf node_modules package-lock.json
npm install



License
This project currently has no explicit license. Add one if you plan to distribute.


