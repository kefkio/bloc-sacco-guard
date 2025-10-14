// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract LoanManager is Ownable {
    struct Loan {
        address borrower;
        uint256 amount; // in wei
        bool approved;
        bool disbursed;
        uint256 repaid; // total repaid wei
    }

    uint256 public nextId;
    mapping(uint256 => Loan) public loans;

    event Applied(uint256 indexed id, address indexed borrower, uint256 amount);
    event Approved(uint256 indexed id);
    event Disbursed(uint256 indexed id, address indexed to, uint256 amount);
    event Repaid(uint256 indexed id, address indexed from, uint256 amount);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function apply(uint256 amount) external returns (uint256 id) {
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

    function approve(uint256 id) external onlyOwner {
        Loan storage ln = loans[id];
        require(ln.borrower != address(0), "not found");
        require(!ln.approved, "approved");
        ln.approved = true;
        emit Approved(id);
    }

    function disburse(uint256 id) external onlyOwner {
        Loan storage ln = loans[id];
        require(ln.approved, "not approved");
        require(!ln.disbursed, "disbursed");
        ln.disbursed = true;
        (bool ok, ) = ln.borrower.call{value: ln.amount}("");
        require(ok, "disburse failed");
        emit Disbursed(id, ln.borrower, ln.amount);
    }

    function repay(uint256 id) external payable {
        Loan storage ln = loans[id];
        require(ln.disbursed, "not disbursed");
        require(msg.value > 0, "no value");
        ln.repaid += msg.value;
        emit Repaid(id, msg.sender, msg.value);
    }
}


