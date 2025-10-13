// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface ISavingsPool {
    event Deposited(address indexed account, uint256 amount);
    event Withdrawn(address indexed account, uint256 amount);

    function balanceOf(address account) external view returns (uint256);
    function deposit() external payable;
    function withdraw(uint256 amount) external;
}


