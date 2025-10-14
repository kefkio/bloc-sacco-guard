// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IMemberRegistry} from "./interfaces/IMemberRegistry.sol";

/**
 * MemberRegistry keeps track of SACCO members and an admin-set KYC flag.
 */
contract MemberRegistry is IMemberRegistry, Ownable {
    mapping(address => bool) public override isMember;
    mapping(address => bool) public override kycPassed;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function register() external override {
        require(!isMember[msg.sender], "Already member");
        isMember[msg.sender] = true;
        emit MemberRegistered(msg.sender);
    }

    function unregister() external override {
        require(isMember[msg.sender], "Not member");
        isMember[msg.sender] = false;
        kycPassed[msg.sender] = false;
        emit MemberUnregistered(msg.sender);
    }

    function setKyc(address account, bool passed) external onlyOwner {
        require(isMember[account], "Not member");
        kycPassed[account] = passed;
        emit MemberKycUpdated(account, passed);
    }
}


