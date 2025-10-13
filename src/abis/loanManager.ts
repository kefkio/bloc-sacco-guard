export const loanManagerAbi = [
  {
    "inputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" } ],
    "name": "apply",
    "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" } ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" } ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" } ],
    "name": "disburse",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" } ],
    "name": "repay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ],
    "name": "loans",
    "outputs": [
      { "internalType": "address", "name": "borrower", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "bool", "name": "approved", "type": "bool" },
      { "internalType": "bool", "name": "disbursed", "type": "bool" },
      { "internalType": "uint256", "name": "repaid", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;


