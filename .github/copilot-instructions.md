## Quick orientation

This repository is a Vite + React + TypeScript frontend (src/) that integrates with Ethereum-style smart contracts (contracts/) and a minimal Express API (server/). Wallet and on-chain interaction use wagmi + viem. The dev server proxies `/api` to the server at http://localhost:4000 (see `vite.config.ts`).

Key locations
- `src/` — React app. Entry: `src/main.tsx`, router in `src/App.tsx`.
- `src/abis/` — Contract ABIs used by hooks/components (e.g. `savingsPool.ts`, `memberRegistry.ts`, `loanManager.ts`).
- `src/hooks/` — High-level contract hooks (examples: `useMemberRegistry.ts`, `useSavingsPool.ts`, `useLoanManager.ts`). Follow their patterns for new contract interactions.
- `src/lib/contracts.ts` — Centralized env address constants (VITE_ prefixed). Use `assertAddress()` when code requires a configured address.
- `src/lib/web3.ts` — Default wagmi/viem config (defines Base Sepolia chain). Update here to change default network or transports.
- `server/` — Lightweight Express API; dev script serves at port 4000. `vite.config.ts` proxies `/api` to this server.
- `contracts/` — Hardhat workspace and deploy scripts.

Why this structure
- Keeping ABIs under `src/abis` and address constants in `src/lib/contracts.ts` makes it easy to swap networks and deployments without touching component code.
- Hooks in `src/hooks` encapsulate wagmi usage patterns (read vs write, transaction waiting). Copy these patterns when adding new contract features.

Developer workflows (essential commands)
- Install (frontend): `npm install`
- Dev UI: `npm run dev` — Vite dev server (host `::`, port `8080`).
- Dev API: `cd server && npm install && npm run dev` — starts Express server at port `4000`.
- Build: `npm run build`; Preview: `npm run preview`.
- Hardhat (contracts): `cd contracts` then use `npx hardhat` commands. Example deploy: `npx hardhat run deploy/00_deploy_member_registry.ts --network baseSepolia`.

Important environment variables
- Frontend expects deployed contract addresses (used by `src/lib/contracts.ts`):
  - `VITE_MEMBER_REGISTRY_ADDRESS`
  - `VITE_SAVINGS_POOL_ADDRESS`
  - `VITE_LOAN_MANAGER_ADDRESS`
- Contracts deploys and server may need:
  - `RPC_URL` (used in `contracts/` and `server/.env`)
  - `PRIVATE_KEY` (for deployment scripts)

Coding patterns and examples
- Use the existing hooks as a contract integration template. Example from `useSavingsPool.ts`:
  - Read calls use `useReadContract`/`useContractRead` with `query: { enabled: Boolean(address) && hasAddress }`.
  - Writes use `useWriteContract()` + `useWaitForTransactionReceipt({ hash })` to track confirmations.
  - Convert ETH amounts with `parseEther` (from `viem`) before sending as `value` or args.

- Always check `isConfigured` or use `assertAddress()` before attempting writes that require a contract address. See `src/lib/contracts.ts` and `useMemberRegistry.ts`.

- Import paths use the `@` alias to `./src` (configured in `vite.config.ts` and `tsconfig.json`). Example: `import { savingsPoolAbi } from '@/abis/savingsPool'`.

Tests and linting
- Frontend: lint with `npm run lint` (see root scripts; if missing, follow README). There are unit tests under `contracts/test/` and `test/` for contract behavior.

Debugging tips
- If UI cannot reach the API, ensure the Express server is running at port 4000. Vite proxies `/api` to that address.
- Common dev friction on Windows: OneDrive file-watch issues and PowerShell execution policy. Consider moving the repo outside OneDrive or use Git Bash.

Integration points & external dependencies
- Wallets & on-chain: `wagmi` and `viem` (configured in `src/lib/web3.ts`). Default chain is Base Sepolia (see `defineChain` usage).
- Smart contracts: ABIs live in `src/abis` (frontend) and `contracts/contracts` (Solidity sources). Deploy scripts are in `contracts/deploy/`.
- Server: `server/src/index.ts` exposes `/api/health`. Frontend calls to `/api` are proxied in dev.

What an AI agent should do first when modifying code
1. Read `src/hooks/*` and `src/abis/*` to copy patterns for new contract interactions.
2. Check `src/lib/contracts.ts` for required env variables and use `assertAddress()` when appropriate.
3. Run the dev server locally (`npm run dev`) and the Express server (`cd server && npm run dev`) to reproduce behavior.
4. Run any contract tests from `contracts/test/` if you change solidity or deployment scripts.

Files to reference for examples
- `src/hooks/useMemberRegistry.ts` — contract read/write pattern and transaction confirmation handling.
- `src/hooks/useSavingsPool.ts` — parsing amounts, read/write, and `isConfigured` checks.
- `src/lib/web3.ts` — chain/transports config for wagmi/viem.
- `vite.config.ts` — dev server host/port and proxy settings; `@` alias.
- `contracts/README.md` — instructions for deploying contracts with Hardhat.

If anything is unclear
- Tell me which area needs more detail (deployment, adding a contract hook, testing, or server API). I can expand instructions or add small helper scripts (env templates, npm scripts) on request.
