import { expect } from "chai";
import { ethers } from "hardhat";

describe("MemberRegistry", function () {
  it("registers and flags KYC", async () => {
    const [owner, user] = await ethers.getSigners();
    const MemberRegistry = await ethers.getContractFactory("MemberRegistry");
    const registry = await MemberRegistry.deploy(owner.address);
    await registry.waitForDeployment();

    await registry.connect(user).register();
    expect(await registry.isMember(user.address)).to.eq(true);

    await registry.connect(owner).setKyc(user.address, true);
    expect(await registry.kycPassed(user.address)).to.eq(true);
  });
});


