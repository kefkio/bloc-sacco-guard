// Example Hardhat deploy script (TypeScript)
// Assumes hardhat + ts-node setup

import { ethers } from "hardhat";
import { writeAddress } from "./utils/writeAddresses";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const MemberRegistry = await ethers.getContractFactory("MemberRegistry");
  const registry = await MemberRegistry.deploy(deployer.address);
  await registry.waitForDeployment();

  const addr = await registry.getAddress();
  console.log("MemberRegistry deployed at:", addr);
  writeAddress("MemberRegistry", addr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


