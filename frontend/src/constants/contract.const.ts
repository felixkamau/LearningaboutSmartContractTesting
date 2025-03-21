import { ethers } from "ethers";
import VotingAbi from "../abi/Voting.json";

const ContractAbi: ethers.ContractInterface = VotingAbi.abi;
const ContractAddr: string = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


export {ContractAbi, ContractAddr, VotingAbi};  // Exporting the contract ABI and address