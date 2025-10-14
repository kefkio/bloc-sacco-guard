import { run } from "hardhat";

export async function verifyContract(address: string, constructorArgs: any[] = []) {
  console.log(`🔍 Verifying contract at ${address}...`);
  try {
    await run("verify:verify", {
      address,
      constructorArguments: constructorArgs,
    });
    console.log("✅ Verification successful!");
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("ℹ️ Contract already verified.");
    } else {
      console.error("❌ Verification failed:", error.message);
    }
  }
}
