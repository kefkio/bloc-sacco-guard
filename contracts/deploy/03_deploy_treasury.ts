import { ethers } from "hardhat";
import { writeAddress } from "./utils/writeAddresses";

async function main() {
  console.log("🚀 Starting Treasury contract deployment...");

  // 1. Load deployer account
  const [deployer] = await ethers.getSigners();
  console.log("👤 Deploying with account:", deployer.address);

  // 2. Fetch balance for transparency
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Deployer balance:", ethers.formatEther(balance), "ETH");

  // 3. Deploy Treasury contract
  const Treasury = await ethers.getContractFactory("Treasury");
  console.log("📦 Deploying Treasury contract...");

  const treasury = await Treasury.deploy(deployer.address); // Pass deployer as admin
  await treasury.waitForDeployment();

  // 4. Get contract address
  const addr = await treasury.getAddress();
  console.log("✅ Treasury deployed successfully at:", addr);

  // 5. Save deployed address to JSON file
  writeAddress("Treasury", addr);

  console.log("📝 Address saved to deployment records.");
  console.log("🎯 Deployment complete!\n");
}

// Run deployment and handle errors
main().catch((error) => {
  console.error("❌ Deployment failed due to error:", error);
  process.exitCode = 1;
});
