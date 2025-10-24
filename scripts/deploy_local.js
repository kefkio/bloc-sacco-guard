const hre = require("hardhat");

async function main() {
  const MemberRegistry = await hre.ethers.getContractFactory("MemberRegistry");
  const memberRegistry = await MemberRegistry.deploy();
  await memberRegistry.deployed();
  console.log("MemberRegistry deployed to:", memberRegistry.address);

  const SavingsPool = await hre.ethers.getContractFactory("SavingsPool");
  const savingsPool = await SavingsPool.deploy();
  await savingsPool.deployed();
  console.log("SavingsPool deployed to:", savingsPool.address);

  const LoanManager = await hre.ethers.getContractFactory("LoanManager");
  const loanManager = await LoanManager.deploy();
  await loanManager.deployed();
  console.log("LoanManager deployed to:", loanManager.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
