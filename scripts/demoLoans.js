// scripts/demoLoans.js
import { ethers } from "hardhat";

async function main() {
    // 1️⃣ Get signers
    const [owner, user1, user2] = await ethers.getSigners();
    console.log("Owner:", owner.address);
    console.log("User1:", user1.address);
    console.log("User2:", user2.address);

    // 2️⃣ Deploy LoanManager
    const LoanManager = await ethers.getContractFactory("LoanManager");
    const loanManager = await LoanManager.deploy(owner.address);
    await loanManager.waitForDeployment();
    console.log("LoanManager deployed at:", loanManager.target);

    // 3️⃣ User1 requests a loan
    console.log("\n--- User1 requests a loan of 0.5 ETH ---");
    let tx = await loanManager.connect(user1).requestLoan(ethers.parseEther("0.5"));
    await tx.wait();
    let nextId = await loanManager.nextId();
    console.log("Next Loan ID:", nextId.toString());

    let loan0 = await loanManager.loans(0);
    console.log("Loan 0 details:", loan0);

    // 4️⃣ Owner creates a loan directly for User2
    console.log("\n--- Owner creates a loan of 1 ETH for User2 ---");
    tx = await loanManager.createLoan(user2.address, ethers.parseEther("1"));
    await tx.wait();

    let loan1 = await loanManager.loans(1);
    console.log("Loan 1 details:", loan1);

    // 5️⃣ Display all loan statuses
    console.log("\n--- All Loan IDs and borrowers ---");
    for (let i = 0; i < 2; i++) {
        let ln = await loanManager.loans(i);
        console.log(`Loan ${i}: Borrower=${ln.borrower}, Amount=${ethers.formatEther(ln.amount)} ETH, Approved=${ln.approved}, Disbursed=${ln.disbursed}, Repaid=${ethers.formatEther(ln.repaid)} ETH`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
