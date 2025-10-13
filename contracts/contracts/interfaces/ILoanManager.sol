// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ILoanManager {
    struct Loan {
        address borrower;
        uint256 amount;
        bool approved;
        bool disbursed;
        uint256 repaid;
    }

    event Applied(uint256 indexed id, address indexed borrower, uint256 amount);
    event Approved(uint256 indexed id);
    event Disbursed(uint256 indexed id, address indexed to, uint256 amount);
    event Repaid(uint256 indexed id, address indexed from, uint256 amount);

    function nextId() external view returns (uint256);
    function loans(uint256 id) external view returns (address, uint256, bool, bool, uint256);

    function apply(uint256 amount) external returns (uint256 id);
    function approve(uint256 id) external;
    function disburse(uint256 id) external;
    function repay(uint256 id) external payable;
}


