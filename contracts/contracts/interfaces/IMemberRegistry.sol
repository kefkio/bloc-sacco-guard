// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IMemberRegistry {
    event MemberRegistered(address indexed account);
    event MemberUnregistered(address indexed account);
    event MemberKycUpdated(address indexed account, bool kycPassed);

    function isMember(address account) external view returns (bool);
    function kycPassed(address account) external view returns (bool);

    function register() external;
    function unregister() external;
}


