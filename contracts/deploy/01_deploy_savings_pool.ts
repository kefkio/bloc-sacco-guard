import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const SavingsPool = await ethers.getContractFactory("SavingsPool");
  const pool = await SavingsPool.deploy(deployer.address);
  await pool.waitForDeployment();

  console.log("SavingsPool deployed at:", await pool.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


