# Decentralised-Voting-App

A decentralised voting app built using Ethereum blockchain. Used ganache - cli as an ethereum simulator along with Web3 for front end.  

For installing dependencies go to the directory and run - 

```
npm install

```

For running the code install ganache-cli. On a separate terminal run - <br>

``` 
ganache-cli   

```

Then run -

```
node 
> const Web3 = require('web3');
> const solc = require('solc');
> const fs = require('fs');

> web3 = new Web3(new > Web3.providers.HttpProvider("http://localhost:8545"));

```
To check if ganache - cli is working run - 

```
web3.eth.accounts

```
If it shows all the accounts then ganache cli is working properly.

Now compile the contract - 

```
code = fs.readFileSync('voting.sol').toString();
compiledCode = solc.compile(code);
byteCode = compiledCode.contracts[':Voting'].bytecode;
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
votingContract = web3.eth.contract(abiDefinition);
```
Initialize candidates and voters list - 

```
candidates = ['John','Rick','Sammy'];
candidateIds = [1,2,3];
voters = ['Sudeep','Surya','Pandey'];
voterIds = [1,2,3];

```
Set options and deploy contract.

```
options = {
    data: byteCode, 
    from: web3.eth.accounts[0], 
    gas: 4700000
}
deployedContract = votingContract.new(candidates, candidateIds, voters, voterIds, options);
```
**from** specifies the account from which transaction cost would be deducted. All accounts on ganache-cli are credited with fake ethers.  

```
contractInstance = votingContract.at(deployedContract.address);

```
This will create an instance of smart contract on web3. 
Open **index.js** and replace the output of deployedContract.address with the address in the code. 

Now run index.html.

