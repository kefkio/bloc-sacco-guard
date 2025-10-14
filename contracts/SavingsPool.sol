// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ISavingsPool} from "./interfaces/ISavingsPool.sol";

/**
 * Simple ETH savings pool.
 */
contract SavingsPool is ISavingsPool, Ownable {
    mapping(address => uint256) public override balanceOf;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function deposit() external payable override {
        require(msg.value > 0, "No ETH sent");
        balanceOf[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external override {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "Withdraw transfer failed");
        emit Withdrawn(msg.sender, amount);
    }
}


