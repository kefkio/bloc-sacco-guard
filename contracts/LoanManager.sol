// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ILoanManager} from "./interfaces/ILoanManager.sol";

contract LoanManager is ILoanManager, Ownable {
    uint256 public override nextId;
    mapping(uint256 => Loan) internal _loans;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function loans(uint256 id)
        external
        view
        override
        returns (address borrower, uint256 amount, bool approved, bool disbursed, uint256 repaid)
    {
        Loan storage ln = _loans[id];
        return (ln.borrower, ln.amount, ln.approved, ln.disbursed, ln.repaid);
    }

    function apply(uint256 amount) external override returns (uint256 id) {
        require(amount > 0, "amount=0");
        id = nextId++;
        _loans[id] = Loan({
            borrower: msg.sender,
            amount: amount,
            approved: false,
            disbursed: false,
            repaid: 0
        });
        emit Applied(id, msg.sender, amount);
    }

    function approve(uint256 id) external override onlyOwner {
        Loan storage ln = _loans[id];
        require(ln.borrower != address(0), "not found");
        require(!ln.approved, "approved");
        ln.approved = true;
        emit Approved(id);
    }

    function disburse(uint256 id) external override onlyOwner {
        Loan storage ln = _loans[id];
        require(ln.approved, "not approved");
        require(!ln.disbursed, "disbursed");
        ln.disbursed = true;
        (bool ok, ) = ln.borrower.call{value: ln.amount}("");
        require(ok, "disburse failed");
        emit Disbursed(id, ln.borrower, ln.amount);
    }

    function repay(uint256 id) external payable override {
        Loan storage ln = _loans[id];
        require(ln.disbursed, "not disbursed");
        require(msg.value > 0, "no value");
        ln.repaid += msg.value;
        emit Repaid(id, msg.sender, msg.value);
    }
}


