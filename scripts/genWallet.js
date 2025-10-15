const { ethers } = require('ethers');

const wallet = ethers.Wallet.createRandom();
console.log('Address:    ', wallet.address);
console.log('PrivateKey: ', wallet.privateKey);
console.log('Mnemonic:   ', wallet.mnemonic.phrase);
