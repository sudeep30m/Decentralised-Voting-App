solc = require('solc');
Web3 = require('web3');
fs = require('fs');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('voting.sol').toString();
compiledCode = solc.compile(code)
// abi = JSON.parse(compiledCode.contracts[':Voting'].interface);

