// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * Simple ETH savings pool:
 * - Users deposit native ETH
 * - Balance tracked per address
 * - Users can withdraw their own balance
 */
contract SavingsPool is Ownable {
    event Deposited(address indexed account, uint256 amount);
    event Withdrawn(address indexed account, uint256 amount);

    mapping(address => uint256) public balanceOf;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function deposit() external payable {
        require(msg.value > 0, "No ETH sent");
        balanceOf[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");
        balanceOf[msg.sender] -= amount;
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "Withdraw transfer failed");
        emit Withdrawn(msg.sender, amount);
    }
}


