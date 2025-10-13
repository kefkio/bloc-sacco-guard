// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Minimal MemberRegistry stub for early integration/testing.
 * - register/unregister members
 * - KYC flag settable by owner (admin)
 */
contract MemberRegistry is Ownable {
    event MemberRegistered(address indexed account);
    event MemberUnregistered(address indexed account);
    event MemberKycUpdated(address indexed account, bool kycPassed);

    mapping(address => bool) public isMember;
    mapping(address => bool) public kycPassed;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function register() external {
        require(!isMember[msg.sender], "Already member");
        isMember[msg.sender] = true;
        emit MemberRegistered(msg.sender);
    }

    function unregister() external {
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


