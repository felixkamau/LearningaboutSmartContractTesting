import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";



describe("dVoting", function () {
    /// We define fixture to reuse the same setuo in every test
    async function deploymentVotingFixture(){
        //Contracts are deployed using the first signer/acc by default
        const [owner, otherAccount] = await hre.ethers.getSigners();
        const Voting = await hre.ethers.getContractFactory("Voting");
        const voting = await Voting.deploy();
        return { voting, owner, otherAccount};
    }


    describe("addCandidates", function() {
        it("Should add new candidates", async function() {
            /// Load contract fixture
            const { voting } = await loadFixture(deploymentVotingFixture);

            const candidate_one = "Dev"
            await voting.addCandidate(candidate_one);  
            const addedCandidate = await voting.candidates(0);

            expect(addedCandidate.name).to.equal(candidate_one);
        
        });

        it("Should check if votes is zero after adding a candidate", async function() {
            const { voting } = await loadFixture(deploymentVotingFixture);

            const candidate_one = "Dev"
            const initial_votes = 0;
            await voting.addCandidate(candidate_one);  
            const addedCandidate = await voting.candidates(0);

            expect(addedCandidate.votes).to.equal(initial_votes);

        });

        it("should be able to vote", async function() {
            const  { voting, otherAccount } = await loadFixture(deploymentVotingFixture);

            const candidate_one = "Dev"
            const addesCandidate = await voting.addCandidate(candidate_one);  
            // const addedCandidate = await voting.candidates(0);
            const candidateIdx = 0;
            const voter = otherAccount;

            // Vote as other acc
            await voting.connect(voter).vote(candidateIdx);


        });

        it("Should increase the votes of the candidate after a vote", async function(){
            const  { voting, otherAccount } = await loadFixture(deploymentVotingFixture);

            const candidate_one = "Dev"
            const addesCandidate = await voting.addCandidate(candidate_one);  
            
            const candidateIdx = 0;
            const voter = otherAccount;

            // Vote as other acc
            await voting.connect(voter).vote(candidateIdx);

            // // Retrieve updated candidate details
            const votedCandidate = await voting.candidates(candidateIdx);

            expect(votedCandidate.votes).to.equal(1);
        });

        it("Should not allow people to vote twice", async function(){
            const  { voting, otherAccount } = await loadFixture(deploymentVotingFixture);

            const candidate_one = "Dev"
            const addesCandidate = await voting.addCandidate(candidate_one);  
            
            const candidateIdx = 0;
            const voter = otherAccount;

            // First vote should succed
            await voting.connect(voter).vote(candidateIdx);

            // Second should revert
            await expect(voting.connect(voter).vote(candidateIdx))
                   .to.be.revertedWith("You have already voted");
        });

        it("Should return the correct winner", async function () {
            const { voting, otherAccount } = await loadFixture(deploymentVotingFixture);
        
            // Add candidates
            await voting.addCandidate("Alice");
            await voting.addCandidate("Bob");
        
            // Cast votes
            await voting.connect(otherAccount).vote(1); // Vote for Bob (index 1)
        
            // Get the winner
            const [winnerName, winnerVotes] = await voting.getWinner();
        
            // Assertions
            expect(winnerName).to.equal("Bob"); // Bob should be the winner
            expect(winnerVotes).to.equal(1); // Bob should have 1 vote
        });
        

    })

})