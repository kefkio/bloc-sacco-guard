import { expect } from "chai";
import { ethers } from "hardhat";

describe("SavingsPool", function () {
  it("deposits and withdraws", async () => {
    const [owner, user] = await ethers.getSigners();
    const SavingsPool = await ethers.getContractFactory("SavingsPool");
    const pool = await SavingsPool.deploy(owner.address);
    await pool.waitForDeployment();

    await pool.connect(user).deposit({ value: ethers.parseEther("0.1") });
    expect(await pool.balanceOf(user.address)).to.eq(ethers.parseEther("0.1"));

    await pool.connect(user).withdraw(ethers.parseEther("0.05"));
    expect(await pool.balanceOf(user.address)).to.eq(ethers.parseEther("0.05"));
  });
});


