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

  it("registers a member and emits MemberRegistered", async () => {
    await expect(memberRegistry.connect(user).registerMember())
      .to.emit(memberRegistry, "MemberRegistered")
      .withArgs(user.address);

    expect(await memberRegistry.isRegistered(user.address)).to.be.true;
    expect(await memberRegistry.isKycPassed(user.address)).to.be.false;
  });

  it("prevents double registration", async () => {
    await memberRegistry.connect(user).registerMember();
    await expect(memberRegistry.connect(user).registerMember()).to.be.revertedWith("Already registered");
  });

  it("requires exit request before unregistering", async () => {
    await memberRegistry.connect(user).registerMember();
    await expect(memberRegistry.connect(user).unregisterMember()).to.be.revertedWith("Exit not requested");
  });

  it("allows a member to request exit and emits ExitRequested", async () => {
    await memberRegistry.connect(user).registerMember();
    await expect(memberRegistry.connect(user).requestExit())
      .to.emit(memberRegistry, "ExitRequested")
      .withArgs(user.address);

    expect(await memberRegistry.hasRequestedExit(user.address)).to.be.true;
  });

  it("prevents duplicate exit requests", async () => {
    await memberRegistry.connect(user).registerMember();
    await memberRegistry.connect(user).requestExit();
    await expect(memberRegistry.connect(user).requestExit()).to.be.revertedWith("Already requested");
  });

  it("unregisters a member after exit request and emits MemberUnregistered", async () => {
    await memberRegistry.connect(user).registerMember();
    await memberRegistry.connect(user).requestExit();
    await expect(memberRegistry.connect(user).unregisterMember())
      .to.emit(memberRegistry, "MemberUnregistered")
      .withArgs(user.address);

    expect(await memberRegistry.isRegistered(user.address)).to.be.false;
    // After deletion the mapping should return default values
    expect(await memberRegistry.hasRequestedExit(user.address)).to.be.false;
  });

  it("allows owner to update KYC status and emits MemberKycUpdated", async () => {
    await memberRegistry.connect(user).registerMember();
    await expect(memberRegistry.updateKycStatus(user.address, true))
      .to.emit(memberRegistry, "MemberKycUpdated")
      .withArgs(user.address, true);

    expect(await memberRegistry.isKycPassed(user.address)).to.be.true;
  });

  it("prevents non-owner from updating KYC", async () => {
    await memberRegistry.connect(user).registerMember();
    // OpenZeppelin's Ownable may revert with a custom error; assert revert occurred
    await expect(memberRegistry.connect(user).updateKycStatus(user.address, true)).to.be.reverted;
  });
});