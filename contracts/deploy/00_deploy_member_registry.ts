// Example Hardhat deploy script (TypeScript)
// Assumes hardhat + ts-node setup

import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const MemberRegistry = await ethers.getContractFactory("MemberRegistry");
  const registry = await MemberRegistry.deploy(deployer.address);
  await registry.waitForDeployment();

  console.log("MemberRegistry deployed at:", await registry.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


