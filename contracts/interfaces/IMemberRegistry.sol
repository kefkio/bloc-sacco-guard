// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title IMemberRegistry
 * @dev Interface for SACCO member registration, exit requests, and KYC verification.
 */
interface IMemberRegistry {
    // 📣 Events
    event MemberRegistered(address indexed member);
    event MemberUnregistered(address indexed member);
    event MemberKycUpdated(address indexed member, bool passed);
    event ExitRequested(address indexed member);

    // 🧾 Core member actions
    function registerMember() external;
    function unregisterMember() external;
    function updateKycStatus(address account, bool passed) external;

    // 🔍 View functions
    function isRegistered(address account) external view returns (bool);
    function isKycPassed(address account) external view returns (bool);
    function hasRequestedExit(address account) external view returns (bool);
}