// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ILoanManager
 * @dev Interface for LoanManager contract
 */
interface ILoanManager {
    // ======================
    // Structs
    // ======================
    struct Loan {
        address borrower;  // Address of the borrower
        uint256 amount;    // Loan amount
        bool approved;     // Whether loan has been approved
        bool disbursed;    // Whether loan has been disbursed
        uint256 repaid;    // Amount repaid so far
    }

    // ======================
    // State variables
    // ======================
    function nextId() external view returns (uint256);
    function loans(uint256 id)
        external
        view
        returns (
            address borrower,
            uint256 amount,
            bool approved,
            bool disbursed,
            uint256 repaid
        );

    // ======================
    // Functions
    // ======================
    function requestLoan(uint256 amount) external returns (uint256 id);
    function approve(uint256 id) external;
    function disburse(uint256 id) external;
    function repay(uint256 id) external payable;

    // ======================
    // Events
    // ======================
    event Applied(uint256 indexed id, address indexed borrower, uint256 amount);
    event Approved(uint256 indexed id);
    event Disbursed(uint256 indexed id, address indexed borrower, uint256 amount);
    event Repaid(uint256 indexed id, address indexed borrower, uint256 amount);
}
