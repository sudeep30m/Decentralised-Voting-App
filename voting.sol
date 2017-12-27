pragma solidity ^0.4.18;

contract Voting {
    bytes32[] voters;
    mapping(bytes32 => uint8) voteCount;
    
    function Voting(bytes32[] CandidateList) {
        voters = CandidateList;        
    }
    
    function addVote (bytes32 candidate)  {
        if(!validCandidate(candidate))
            throw;
        voteCount[candidate] += 1;
    }

    function totalVotes(bytes32 candidate) returns (uint finalVotes) {
        if(!validCandidate(candidate))
            throw;
        finalVotes = voteCount[candidate];        
    }

    function validCandidate(bytes32 candidate)  returns(bool) {
        for(uint i = 0; i < voters.length; i++) {
            if(voters[i] == candidate)
                return true;
        }
        return false;
    }
    
    
}