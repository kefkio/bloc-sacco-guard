import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

/**
 * Utility to save deployed contract addresses.
 * Keeps a JSON record at ./deployed/addresses.json
 */
function saveAddress(contractName: string, address: string) {
  try {
    const savePath = path.join(__dirname, "deployed");
    const filePath = path.join(savePath, "addresses.json");

    // Ensure directory exists
    if (!fs.existsSync(savePath)) fs.mkdirSync(savePath, { recursive: true });

    // Load existing data
    let existing: Record<string, string> = {};
    if (fs.existsSync(filePath)) {
      try {
        existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } catch {
        console.warn("⚠️  Warning: addresses.json is invalid. Recreating file...");
      }
    }

    // Add or update contract address
    existing[contractName] = address;

    // Save back to disk
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));
    console.log(`📦 Saved ${contractName} address to: ${filePath}`);
  } catch (err) {
    console.error("❌ Failed to save address file:", err);
  }
}

async function main() {
  console.log("🚀 Starting LoanManager deployment...");

  const [deployer] = await ethers.getSigners();
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log(`👤 Deployer: ${deployer.address}`);
  console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);

  // Deploy contract
  const LoanManager = await ethers.getContractFactory("LoanManager");
  const manager = await LoanManager.deploy(deployer.address);

  console.log("⏳ Deploying LoanManager, please wait...");
  await manager.waitForDeployment();

  const addr = await manager.getAddress();
  console.log(`✅ LoanManager deployed at: ${addr}`);

  // Save deployed address
  saveAddress("LoanManager", addr);

  console.log("🎉 Deployment completed successfully!");
}

// Execute deployment
main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
