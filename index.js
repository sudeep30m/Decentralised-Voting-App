web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// Th string below is the ouptut of compiledCode.contracts[':Voting'].interface
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"id","type":"uint8"}],"name":"getVoterName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getCandidates","outputs":[{"name":"","type":"uint8[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"id","type":"uint8"}],"name":"addVoter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"voterList","outputs":[{"name":"voterId","type":"uint8"},{"name":"name","type":"bytes32"},{"name":"voteCasted","type":"bool"},{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint8"}],"name":"getCandidateName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint8"}],"name":"totalVotes","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"cId","type":"uint8"},{"name":"vId","type":"uint8"}],"name":"castVote","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint8"}],"name":"voterExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint8"}],"name":"candidateExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getVoters","outputs":[{"name":"","type":"uint8[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"bytes32"},{"name":"id","type":"uint8"}],"name":"addCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint8"}],"name":"candidateList","outputs":[{"name":"candidateId","type":"uint8"},{"name":"name","type":"bytes32"},{"name":"totalVotes","type":"uint8"},{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint8"}],"name":"voteCasted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"},{"name":"candidateIds","type":"uint8[]"},{"name":"voterNames","type":"bytes32[]"},{"name":"voterIds","type":"uint8[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
VotingContract = web3.eth.contract(abi);

// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x865c6281d5c086256093d5000dcd12f10c1a9d9f');

var voteMapping = {
    "true":"Yes",
    "false":"No"
};

// Voting for a given candidate id only if voter hasn't casted vote before. 
function voteForCandidate() {
    var candidateId = $("#candidate").val();
    var voterId = $("#voter").val();
	contractInstance.castVote(candidateId,voterId, {
        from: web3.eth.accounts[0]
	}, function () {
		var votes = contractInstance.totalVotes.call(candidateId).toString();
        var voteCasted = voteMapping[contractInstance.voteCasted.call(voterId).toString()];
        $("#candidate-" + candidateId.toString()).html(votes);
        $("#voter-" + voterId.toString()).html(voteCasted);
    });
}

// Adding a candidate with a unique id. If id is present candidate won't be added.
function addCandidate() {
	var candidateName = $("#candidateName").val();
    var candidateId = $("#candidateId").val();
    console.log(candidateId);
	contractInstance.addCandidate(candidateName, candidateId, {
        from: web3.eth.accounts[2],
        gas: 100000
	}, function () {
        console.log('Yoo');
        var exists = contractInstance.candidateExists.call(candidateId);
        if (exists) {
            console.log('Yeah');
			var votes = contractInstance.totalVotes.call(candidateId).toString();
			var html = "<tr><td>" + candidateId.toString() + "</td><td>" + candidateName + "</td><td id=\"candidate-"+ id +"\">" + votes + "</td></tr>";
            $('#candidateTable > tbody:last').append(html);
            
		}
	})
}

// Adding a voter with a unique id. If id is present voter won't be added.
function addVoter() {
	var voterName = $("#voterName").val();
    var voterId = $("#voterId").val();
    console.log(voterId);
	contractInstance.addVoter(voterName, voterId, {
        from: web3.eth.accounts[2],
        gas: 100000
	}, function () {
        console.log('Yoo');
        var exists = contractInstance.voterExists.call(voterId);
        if (exists) {
            console.log('Yeah');
			var voteCasted = voteMapping[contractInstance.voteCasted.call(voterId).toString()];
			var html = "<tr><td>" + candidateId.toString() + "</td><td>" + candidateName + "</td><td id=\"candidate-"+ id +"\">" + voteCasted + "</td></tr>";
            $('#candidateTable > tbody:last').append(html);
            
		}
	})
}


$(document).ready(function () {
	candidateNames = contractInstance.getCandidates.call();
	voterNames = contractInstance.getVoters.call();
    
    // Retrieving already existing canidates.
    for(var i = 0;i < candidateNames.length; i++ ) {
        let id = candidateNames[i].toString();
        let name = web3.toAscii(contractInstance.getCandidateName.call(id));
        let votes = contractInstance.totalVotes.call(id).toString();
        var html = "<tr><td>" + id + "</td><td>" + name + "</td><td id=\"candidate-"+ id +"\">" + votes + "</td></tr>";
        $('#candidateTable > tbody:last').append(html);
    }

    // Retrieving already existing voters.
    for(var i = 0;i < voterNames.length; i++ ) {
        let id = voterNames[i].toString();
        let name = web3.toAscii(contractInstance.getVoterName.call(id));
        let voteCasted = voteMapping[contractInstance.voteCasted.call(id).toString()];
        var html = "<tr><td>" + id + "</td><td>" + name + "</td><td id=\"voter-"+ id +"\">" + voteCasted + "</td></tr>";
        $('#voterTable > tbody:last').append(html);
    }
});