// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IMemberRegistry.sol";

/**
 * @title MemberRegistry
 * @dev Implements IMemberRegistry to manage SACCO member registration, exit requests, and KYC verification.
 */
contract MemberRegistry is Ownable, IMemberRegistry {
    struct Member {
        bool isRegistered;
        bool isKycPassed;
        bool exitRequested;
    }

    mapping(address => Member) private members;

    // No event redeclarations here; declared in interface

    constructor(address initialOwner) Ownable(msg.sender) {
        if (initialOwner != address(0) && initialOwner != msg.sender) {
            transferOwnership(initialOwner);
        }
    }

    /// @notice Register the sender as a SACCO member
    function registerMember() external override {
        require(!members[msg.sender].isRegistered, "Already registered");
        members[msg.sender] = Member(true, false, false);
        emit MemberRegistered(msg.sender);
    }

    /// @notice Request to exit SACCO membership
    function requestExit() external {
        require(members[msg.sender].isRegistered, "Not registered");
        require(!members[msg.sender].exitRequested, "Already requested");
        members[msg.sender].exitRequested = true;
        emit ExitRequested(msg.sender);
    }

    /// @notice Admin removes a member after exit request
    function unregisterMember() external override {
        require(members[msg.sender].isRegistered, "Not registered");
        require(members[msg.sender].exitRequested, "Exit not requested");
        delete members[msg.sender];
        emit MemberUnregistered(msg.sender);
    }

    /// @notice Admin updates KYC status
    function updateKycStatus(address account, bool passed) external override onlyOwner {
        require(members[account].isRegistered, "Not registered");
        members[account].isKycPassed = passed;
        emit MemberKycUpdated(account, passed);
    }

    /// @notice Check if an address is registered
    function isRegistered(address account) external view override returns (bool) {
        return members[account].isRegistered;
    }

    /// @notice Check if an address has passed KYC
    function isKycPassed(address account) external view override returns (bool) {
        return members[account].isKycPassed;
    }

    /// @notice Check if an address has requested exit
    function hasRequestedExit(address account) external view override returns (bool) {
        return members[account].exitRequested;
    }
}