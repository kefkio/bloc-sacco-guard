import fs from "fs";
import path from "path";

const DEPLOY_FILE = path.join(__dirname, "../deployments.json");

export function writeAddress(contractName: string, address: string) {
  let deployments: Record<string, string> = {};

  // Read existing deployments
  if (fs.existsSync(DEPLOY_FILE)) {
    const data = fs.readFileSync(DEPLOY_FILE, "utf-8");
    deployments = JSON.parse(data);
  }

  deployments[contractName] = address;
  fs.writeFileSync(DEPLOY_FILE, JSON.stringify(deployments, null, 2));

  console.log(`📝 Saved ${contractName} address: ${address}`);
}
