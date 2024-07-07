require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
    },
  },

  defaultNetwork: "sepolia",

  networks: {
    sepolia: {
      chainId: 11155111,
      url: "https://rpc2.sepolia.org",
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: "JYMKRTHHFUSX4X11I1NQRNW6X7K2FJFJUU",
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};
