// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Voting {

    struct Candidate {
        string name;
        uint256 votes;
    }

    Candidate[] public candidates;

    mapping(address => bool) public hasVoted;

    function addCandidate(string memory _candidateName) public {
        candidates.push(Candidate(_candidateName, 0));
    }

    function vote(uint256 _candidateIndex) public {
        require(!hasVoted[msg.sender],"You have already voted");
        require(_candidateIndex < candidates.length,"Invalid canidate index");
        candidates[_candidateIndex].votes++;
        hasVoted[msg.sender] = true;
    }

    function getWinner() public view returns(string memory, uint256){
        require(candidates.length > 0,"No Candidates available");

        uint256 winingVoteCount = 0;
        string memory winnerName;
        for( uint256 i = 0; i < candidates.length; i++){
            if(candidates[i].votes > winingVoteCount){
                winingVoteCount = candidates[i].votes;
                winnerName = candidates[i].name;
            }
        }

        return (winnerName, winingVoteCount);
    }
}

