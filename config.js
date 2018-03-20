const Web3 = require('web3');
const solc = require('solc')
const fs = require('fs');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// console.log(web3.eth.accounts)
code = fs.readFileSync('voting.sol').toString();
compiledCode = solc.compile(code);
byteCode = compiledCode.contracts[':Voting'].bytecode;
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
votingContract = web3.eth.contract(abiDefinition);
candidates = ['John','Rick','Sammy'];
candidateIds = [1,2,3];
voters = ['Sudeep','Surya','Pandey'];
voterIds = [1,2,3];
options = {
    data: byteCode, 
    from: web3.eth.accounts[0], 
    gas: 4700000
}
// votingContract = votingContract.at(web3.eth.accounts[1]);
deployedContract = votingContract.new(candidates, candidateIds, voters, voterIds, options);
console.log(deployedContract.address);
contractInstance = votingContract.at(deployedContract.address);

// console.log('Yoo')
// console.log(contractInstance);
