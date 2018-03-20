 pragma solidity ^0.4.8;

contract Voting {

    struct Candidate {
        uint8 candidateId;
        bytes32 name;
        uint8 totalVotes;
        bool exists;
    }

    struct Voter {
        uint8 voterId;
        bytes32 name;
        bool voteCasted;
        bool exists;
    }

    uint8[] candidates;
    uint8[] voters;
    mapping ( uint8 => Candidate) public candidateList;
    mapping ( uint8 => Voter) public voterList;

    function Voting(bytes32[] candidateNames, uint8[] candidateIds, bytes32[] voterNames, uint8[] voterIds) {
        // totalCandidates = candidateNames.length;
        // totalVoters = voterNames.length;
        for (uint i = 0; i < candidateNames.length; i++) {
            uint8 cId = candidateIds[i];
            if (candidateList[cId].exists == false) {
                candidates.push(cId);
                candidateList[cId] = Candidate(candidateIds[i], candidateNames[i], 0, true);  
            }
        }

        for ( i = 0; i < voterNames.length; i++) {
            uint8 vId = voterIds[i];
            if (voterList[vId].exists == false) {
                voters.push(vId);
                voterList[vId] = Voter(voterIds[i], voterNames[i], false, true);  
            }
        }
    }

    function getVoters() public returns (uint8[]) {
        return voters;        
    }

    function getCandidates() public returns (uint8[]) {
        return candidates;
    }

    function castVote (uint8 cId, uint8 vId) public returns (bool) {
        Candidate c = candidateList[cId];
        Voter v = voterList[vId];
        if (v.exists == false || c.exists == false)
            throw;
        if (v.voteCasted == false) {
            c.totalVotes += 1;
            v.voteCasted = true;
            return true;
        }
        return false;
    }

    function totalVotes(uint8 id) public returns (uint8) {
        Candidate c = candidateList[id];
        if (!c.exists)
            throw;
        return c.totalVotes; 
    }

    function voteCasted(uint8 id) public returns (bool) {
        Voter v = voterList[id];
        if (!v.exists)
            throw;
        return v.voteCasted; 
    }

    function getCandidateName(uint8 id) public returns (bytes32) {
        return candidateList[id].name;
    }

    function getVoterName(uint8 id) public returns (bytes32) {
        return voterList[id].name;
    }


    function candidateExists(uint8 id) public returns (bool) {
        return candidateList[id].exists;
    }

    function voterExists(uint8 id) public returns (bool) {
        return voterList[id].exists;
    }

    function addCandidate(bytes32 name, uint8 id) public {
        if (!candidateList[id].exists) {
            candidateList[id] = Candidate(id, name, 0, true);
            candidates.push(id);
        }
    }

    function addVoter(bytes32 name, uint8 id) public {
        if (!voterList[id].exists) { 
            voterList[id] = Voter(id, name, false, true);
            // totalVoters++;
            voters.push(id);
        }
    }
    
    
}