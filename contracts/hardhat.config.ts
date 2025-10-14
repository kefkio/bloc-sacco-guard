import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

// 🧩 Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY?.startsWith("0x")
  ? process.env.PRIVATE_KEY
  : process.env.PRIVATE_KEY
  ? `0x${process.env.PRIVATE_KEY}`
  : "";

const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""; // optional, for gas reports

// 🛡️ Type-safe Hardhat configuration
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Efficient gas optimization
      },
      viaIR: true, // Enable intermediate representation for better optimization
    },
  },

  defaultNetwork: "hardhat",

  networks: {
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: false,
      mining: {
        auto: true,
        interval: 3000, // Simulate block times (3s)
      },
    },

    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },

    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      gasMultiplier: 1.2,
      chainId: 11155111,
    },

    holesky: {
      url: `https://holesky.infura.io/v3/${INFURA_API_KEY}`,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      gasMultiplier: 1.2,
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  gasReporter: {
    enabled: process.env.REPORT_GAS === "true",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH",
    excludeContracts: ["mocks/"],
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
    deploy: "./deploy",
  },

  mocha: {
    timeout: 60000,
  },
};

export default config;
