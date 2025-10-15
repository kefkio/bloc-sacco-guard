// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ILoanManager} from "../interfaces/ILoanManager.sol";

/**
 * @title LoanManager
 * @dev Implementation of ILoanManager interface to manage loans
 * - Allows users to request loans
 * - Allows owner to approve and disburse loans
 * - Allows borrowers to repay loans
 * - Allows owner to create loans directly for specific borrowers
 */
contract LoanManager is ILoanManager, Ownable {
    /// @notice Tracks the next loan ID
    uint256 public override nextId;

    /// @notice Maps loan ID to Loan struct
    mapping(uint256 => Loan) public override loans;

    /**
     * @dev Constructor sets initial owner
     * @param initialOwner The address of the owner (admin) of the contract
     */
    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @notice Request a new loan
     * @param amount The amount to borrow (in wei)
     * @return id The newly created loan ID
     */
    function requestLoan(uint256 amount) external override returns (uint256 id) {
        require(amount > 0, "amount=0");

        id = nextId++;
        loans[id] = Loan({
            borrower: msg.sender,
            amount: amount,
            approved: false,
            disbursed: false,
            repaid: 0
        });

        emit Applied(id, msg.sender, amount);
    }

    /**
     * @notice Approve a loan (owner only)
     * @param id The ID of the loan to approve
     */
    function approve(uint256 id) external override onlyOwner {
        Loan storage ln = loans[id];
        require(ln.borrower != address(0), "not found");
        require(!ln.approved, "already approved");

        ln.approved = true;
        emit Approved(id);
    }

    /**
     * @notice Disburse an approved loan (owner only)
     * @param id The ID of the loan to disburse
     */
    function disburse(uint256 id) external override onlyOwner {
        Loan storage ln = loans[id];
        require(ln.approved, "not approved");
        require(!ln.disbursed, "already disbursed");

        ln.disbursed = true;

        (bool ok, ) = ln.borrower.call{value: ln.amount}("");
        require(ok, "disburse failed");

        emit Disbursed(id, ln.borrower, ln.amount);
    }

    /**
     * @notice Repay a loan
     * @param id The ID of the loan to repay
     */
    function repay(uint256 id) external override payable {
        Loan storage ln = loans[id];
        require(ln.disbursed, "not disbursed");
        require(msg.value > 0, "no value");

        ln.repaid += msg.value;

        emit Repaid(id, msg.sender, msg.value);
    }

    /**
     * @notice Allows the owner to create a loan directly for a borrower (auto-approved)
     * @param borrower The address of the borrower
     * @param amount The loan amount
     * @return id The newly created loan ID
     */
    function createLoan(address borrower, uint256 amount) external onlyOwner returns (uint256 id) {
        require(borrower != address(0), "invalid borrower");
        require(amount > 0, "amount=0");

        id = nextId++;
        loans[id] = Loan({
            borrower: borrower,
            amount: amount,
            approved: true,   // auto-approved since admin created it
            disbursed: false,
            repaid: 0
        });

        emit Applied(id, borrower, amount);
        emit Approved(id); // emit approval since it's auto-approved
    }
}
