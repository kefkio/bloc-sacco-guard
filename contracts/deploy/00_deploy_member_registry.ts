import { ethers } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  // 1. Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("🚀 Deploying MemberRegistry with account:", deployer.address);
  console.log("💰 Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // 2. Get the contract factory
  const MemberRegistry = await ethers.getContractFactory("MemberRegistry");

  // 3. Deploy the contract (adjust constructor args if needed)
  const registry = await MemberRegistry.deploy(deployer.address);
  await registry.waitForDeployment();

  const deployedAddress = await registry.getAddress();
  console.log("✅ MemberRegistry deployed at:", deployedAddress);

  // 4. Save the deployed address locally
  saveAddress("MemberRegistry", deployedAddress);
}

/**
 * Helper: save deployed contract address to a JSON file
 */
function saveAddress(contractName: string, address: string) {
  const filePath = path.join(__dirname, "addresses.json");

  let addresses: Record<string, string> = {};
  if (fs.existsSync(filePath)) {
    try {
      addresses = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (error) {
      console.warn("⚠️ Could not parse existing addresses.json, creating a new one.");
    }
  }

  addresses[contractName] = address;
  fs.writeFileSync(filePath, JSON.stringify(addresses, null, 2));
  console.log(`📘 Saved ${contractName} address to ${filePath}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
