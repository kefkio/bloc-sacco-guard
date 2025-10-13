import { ethers } from "hardhat";
import { writeAddress } from "./utils/writeAddresses";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const LoanManager = await ethers.getContractFactory("LoanManager");
  const mgr = await LoanManager.deploy(deployer.address);
  await mgr.waitForDeployment();

  const addr = await mgr.getAddress();
  console.log("LoanManager deployed at:", addr);
  writeAddress("LoanManager", addr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


