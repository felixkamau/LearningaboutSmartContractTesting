// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const VotingModule = buildModule("LockModule", (m) => {
  const vote = m.contract("Voting");

  return { vote };
});

export default VotingModule;
