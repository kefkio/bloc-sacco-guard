## Contracts Workspace (Hardhat)

This folder will contain smart contracts and deployment scripts.

### Setup
```bash
cd contracts
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox typescript ts-node
npm install @openzeppelin/contracts
npx hardhat init --template ts --force
```

### Files to add
- `contracts/MemberRegistry.sol` – minimal member registry stub
- `deploy/00_deploy_member_registry.ts` – deploy script

### Example env
```
RPC_URL="https://sepolia.base.org"
PRIVATE_KEY="0x..."
```

### Deploy
```bash
npx hardhat run deploy/00_deploy_member_registry.ts --network baseSepolia
```


