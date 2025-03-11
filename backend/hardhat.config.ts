import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-solhint";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Add other networks if needed
  },
};

export default config;
