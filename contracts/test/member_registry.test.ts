import { expect } from "chai";
import { ethers } from "hardhat";

describe("MemberRegistry", function () {
  let memberRegistry: any;
  let owner: any;
  let user: any;

  beforeEach(async () => {
    [owner, user] = await ethers.getSigners();
    const MemberRegistry = await ethers.getContractFactory("MemberRegistry");
    memberRegistry = await MemberRegistry.deploy(owner.address);
    await memberRegistry.waitForDeployment();
  });

  it("should register a member", async () => {
    await memberRegistry.connect(user).registerMember();
    expect(await memberRegistry.isRegistered(user.address)).to.be.true;
  });

  it("should not allow double registration", async () => {
    await memberRegistry.connect(user).registerMember();
    await expect(memberRegistry.connect(user).registerMember()).to.be.revertedWith("Already registered");
  });

  it("should allow owner to update KYC status", async () => {
    await memberRegistry.connect(user).registerMember();
    await memberRegistry.updateKycStatus(user.address, true);
    expect(await memberRegistry.isKycPassed(user.address)).to.be.true;
  });

  it("should not allow non-owner to update KYC", async () => {
    await memberRegistry.connect(user).registerMember();
    await expect(memberRegistry.connect(user).updateKycStatus(user.address, true)).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("should unregister a member", async () => {
    await memberRegistry.connect(user).registerMember();
    await memberRegistry.connect(user).unregisterMember();
    expect(await memberRegistry.isRegistered(user.address)).to.be.false;
  });
});