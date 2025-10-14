import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

/**
 * Utility to save deployed contract addresses
 * Keeps a JSON record at ./deployed/addresses.json
 */
function saveAddress(contractName: string, address: string) {
  try {
    const savePath = path.join(__dirname, "deployed");
    const filePath = path.join(savePath, "addresses.json");

    // Ensure folder exists
    if (!fs.existsSync(savePath)) fs.mkdirSync(savePath, { recursive: true });

    // Load existing data
    let existing: Record<string, string> = {};
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch {
        console.warn("⚠️  Warning: addresses.json is invalid. Recreating it...");
      }
    }

    // Add or update entry
    existing[contractName] = address;

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    console.log(`📦 Saved ${contractName} address to: ${filePath}`);
  } catch (err) {
    console.error("❌ Failed to save address file:", err);
  }
}

async function main() {
  console.log("🚀 Starting SavingsPool deployment...");

  const [deployer] = await ethers.getSigners();
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`👤 Deployer: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);

  // Deploy the contract
  const SavingsPool = await ethers.getContractFactory("SavingsPool");
  const pool = await SavingsPool.deploy(deployer.address);

  console.log("⏳ Deploying SavingsPool, please wait...");
  await pool.waitForDeployment();

  const addr = await pool.getAddress();
  console.log(`✅ SavingsPool deployed at: ${addr}`);

  // Save address for later use
  saveAddress("SavingsPool", addr);

  console.log("🎉 Deployment completed successfully!");
}

// Run the deployment
main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
