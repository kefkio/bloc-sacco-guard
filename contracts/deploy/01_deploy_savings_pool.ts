import { ethers } from "hardhat";
import { writeAddress } from "./utils/writeAddresses";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const SavingsPool = await ethers.getContractFactory("SavingsPool");
  const pool = await SavingsPool.deploy(deployer.address);
  await pool.waitForDeployment();

  const addr = await pool.getAddress();
  console.log("SavingsPool deployed at:", addr);
  writeAddress("SavingsPool", addr);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


