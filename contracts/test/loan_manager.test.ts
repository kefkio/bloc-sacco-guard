import { expect } from "chai";
import { ethers } from "hardhat";

describe("LoanManager", function () {
  it("apply, approve, disburse, repay", async () => {
    const [owner, borrower] = await ethers.getSigners();
    const LoanManager = await ethers.getContractFactory("LoanManager");
    const mgr = await LoanManager.deploy(owner.address);
    await mgr.waitForDeployment();

    const tx = await mgr.connect(borrower).apply(ethers.parseEther("1"));
    await tx.wait();
    const id = 0n;

    await mgr.connect(owner).approve(id);
    await expect(mgr.disburse(id)).to.be.reverted; // no funds in contract

    // fund contract then disburse
    await owner.sendTransaction({ to: await mgr.getAddress(), value: ethers.parseEther("1") });
    await mgr.connect(owner).disburse(id);

    await mgr.connect(borrower).repay(id, { value: ethers.parseEther("0.4") });
    const loan = await mgr.loans(id);
    expect(loan[4]).to.eq(ethers.parseEther("0.4"));
  });
});


