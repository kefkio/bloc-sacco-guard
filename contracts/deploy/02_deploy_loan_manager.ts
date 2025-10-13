import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const LoanManager = await ethers.getContractFactory("LoanManager");
  const mgr = await LoanManager.deploy(deployer.address);
  await mgr.waitForDeployment();

  console.log("LoanManager deployed at:", await mgr.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


