import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",      // match your contracts
    settings: {
      viaIR: true,           // enable IR pipeline to fix memory-to-storage errors
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
