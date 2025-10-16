import fs from "fs";
import path from "path";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy MemberRegistry
  const MemberRegistry = await ethers.getContractFactory("MemberRegistry");
  const memberRegistry = await MemberRegistry.deploy(deployer.address);
  await memberRegistry.waitForDeployment();
  console.log("MemberRegistry deployed to:", await memberRegistry.getAddress());

  // Deploy SavingsPool
  const SavingsPool = await ethers.getContractFactory("SavingsPool");
  const savingsPool = await SavingsPool.deploy((await memberRegistry.getAddress()));
  await savingsPool.waitForDeployment();
  console.log("SavingsPool deployed to:", await savingsPool.getAddress());

  // Deploy LoanManager
  const LoanManager = await ethers.getContractFactory("LoanManager");
  const loanManager = await LoanManager.deploy((await memberRegistry.getAddress()), (await savingsPool.getAddress()));
  await loanManager.waitForDeployment();
  console.log("LoanManager deployed to:", await loanManager.getAddress());

  // Deploy Treasury
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy((await memberRegistry.getAddress()), (await savingsPool.getAddress()), (await loanManager.getAddress()));
  await treasury.waitForDeployment();
  console.log("Treasury deployed to:", await treasury.getAddress());

  const out = {
    MemberRegistry: await memberRegistry.getAddress(),
    SavingsPool: await savingsPool.getAddress(),
    LoanManager: await loanManager.getAddress(),
    Treasury: await treasury.getAddress(),
  };

  const outPath = path.join(__dirname, "..", "deployments.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log("Wrote deployments to", outPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});