// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SACCOMembers {
    using ECDSA for bytes32;

    struct Member {
        bool isRegistered;
        bool kycApproved;
        uint256 exitRequestTime;
        bytes32 exitCommitment; // For commit-reveal
    }

    address[] private members;
    mapping(address => Member) private memberStatus;
    mapping(bytes32 => bool) private usedCommitments; // Prevent replay

    // Multisig: 2/3 signatures required for KYC updates
    address[3] public kycAdmins;
    mapping(address => bool) public isKycAdmin;

    // Timelock: 28 days (adjust as needed)
    uint256 public constant EXIT_TIMELOCK = 28 days;

    event MemberRegistered(address indexed member);
    event MemberExited(address indexed member);
    event KycStatusUpdated(address indexed member, bool approved);
    event ExitRequested(address indexed member, uint256 requestTime);

    constructor(address[3] memory _kycAdmins) {
        for (uint256 i = 0; i < 3; i++) {
            kycAdmins[i] = _kycAdmins[i];
            isKycAdmin[_kycAdmins[i]] = true;
        }
    }

    // --- Commit-Reveal Registration (Anti-Front-Running) ---
    function registerMember(bytes32 commitment) external {
        require(!usedCommitments[commitment], "Commitment already used");
        require(!memberStatus[msg.sender].isRegistered, "Already registered");

        usedCommitments[commitment] = true;
        memberStatus[msg.sender].exitCommitment = commitment;
        members.push(msg.sender);

        emit MemberRegistered(msg.sender);
    }

    // Reveal phase (call after registration)
    function revealRegistration(bytes32 salt, string memory secret) external {
        address member = msg.sender;
        require(memberStatus[member].isRegistered, "Not registered");
        bytes32 commitment = _hashCommitment(salt, secret, member);
        require(memberStatus[member].exitCommitment == commitment, "Invalid reveal");

        // Clear commitment after reveal
        memberStatus[member].exitCommitment = bytes32(0);
    }

    // --- Commit-Reveal Exit Request ---
    function requestExit(bytes32 commitment) external {
        require(memberStatus[msg.sender].isRegistered, "Not a member");
        require(memberStatus[msg.sender].exitRequestTime == 0, "Exit already requested");
        require(!usedCommitments[commitment], "Commitment used");

        usedCommitments[commitment] = true;
        memberStatus[msg.sender].exitCommitment = commitment;
        memberStatus[msg.sender].exitRequestTime = block.timestamp;

        emit ExitRequested(msg.sender, block.timestamp);
    }

    function revealExit(bytes32 salt, string memory secret) external {
        address member = msg.sender;
        require(memberStatus[member].exitRequestTime > 0, "No exit requested");
        bytes32 commitment = _hashCommitment(salt, secret, member);
        require(memberStatus[member].exitCommitment == commitment, "Invalid reveal");
        require(block.timestamp >= memberStatus[member].exitRequestTime + EXIT_TIMELOCK, "Timelock not expired");

        memberStatus[member].isRegistered = false;
        memberStatus[member].exitRequestTime = 0;
        memberStatus[member].exitCommitment = bytes32(0);

        emit MemberExited(member);
    }

    // --- Multisig KYC Updates ---
    function updateKycStatus(
        address member,
        bool approved,
        bytes[3] memory signatures,
        uint256[3] memory deadlines
    ) external {
        require(_verifyMultisig(member, approved, signatures, deadlines), "Invalid signatures");
        memberStatus[member].kycApproved = approved;
        emit KycStatusUpdated(member, approved);
    }

    // --- Helper Functions ---
    function _hashCommitment(bytes32 salt, string memory secret, address member) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(salt, keccak256(bytes(secret)), member));
    }

    function _verifyMultisig(
        address member,
        bool approved,
        bytes[3] memory signatures,
        uint256[3] memory deadlines
    ) private view returns (bool) {
        bytes32 message = _hashKycUpdate(member, approved);
        uint256 validSignatures = 0;

        for (uint256 i = 0; i < 3; i++) {
            address admin = kycAdmins[i];
            if (deadlines[i] < block.timestamp) revert("Signature expired");
            if (ECDSA.recover(message, signatures[i]) != admin) continue;
            validSignatures++;
        }
        return validSignatures >= 2; // 2/3 threshold
    }

    function _hashKycUpdate(address member, bool approved) private view returns (bytes32) {
        return keccak256(abi.encodePacked(address(this), member, approved, block.chainid));
    }

    // --- View Functions ---
    function isMember(address member) public view returns (bool) {
        return memberStatus[member].isRegistered;
    }

    function getKycStatus(address member) public view returns (bool) {
        return memberStatus[member].kycApproved;
    }

    function getExitRequestTime(address member) public view returns (uint256) {
        return memberStatus[member].exitRequestTime;
    }
}