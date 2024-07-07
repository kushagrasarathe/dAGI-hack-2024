const { ethers } = require("hardhat");

function getAgentID(agentNameID) {
  const abi = ethers.utils.defaultAbiCoder;

  let agentId_bytes = abi.encode(["string"], [agentNameID]);
  const agent_bytes32 = ethers.utils.keccak256(agentId_bytes);

  // Convert the bytes32 value to a BigInt
  const uint256Value = BigInt(agent_bytes32);

  // Perform the uint64 conversion
  const uint64Value = uint256Value & BigInt("0xFFFFFFFFFFFFFFFF");

  // Perform the uint32 conversion
  const uint32Value = Number(uint64Value & BigInt("0xFFFFFFFF"));

  return uint32Value;
}

function getSourceID(sourceName) {
  const abi = ethers.utils.defaultAbiCoder;

  let sourceNameBytes = abi.encode(["string"], [sourceName]);

  const sourceID = ethers.utils.keccak256(sourceNameBytes);

  return sourceID;
}

function getTopKAgents(agentsIDs) {
  const abi = ethers.utils.defaultAbiCoder;
  let bytes = abi.encode(["uint16[]"], [agentsIDs]);
  return bytes;
}

// Base Sepolia
const _unlockContract = "0x259813B665C8f6074391028ef782e27B65840d89";

const codeStringT = `
  const apiResponse = await Functions.makeHttpRequest({
    url: 'https://constellation-opal.vercel.app/api/functions/getTopAgents'
  });

  if (apiResponse.error) {
    console.error(apiResponse.error);
    throw Error('Request failed');
  }

  const { data } = apiResponse;

  // Return tok agents IDs encoded as a hexadecimal string
  return Functions.encodeString(data.encodedIDs);
`;

const codeStringR = `
  const apiResponse = await Functions.makeHttpRequest({
    url: 'https://constellation-opal.vercel.app/api/functions/getTopAgentsByRatingsAvalance'
  });

  if (apiResponse.error) {
    console.error(apiResponse.error);
    throw Error('Request failed');
  }

  const { data } = apiResponse;

  // Return tok agents IDs encoded as a hexadecimal string
  return Functions.encodeString(data.encodedIDs);
`;

const codeStringU = `
  const apiResponse = await Functions.makeHttpRequest({
    url: 'https://constellation-opal.vercel.app/api/functions/getTopUsers'
  });

  if (apiResponse.error) {
    console.error(apiResponse.error);
    throw Error('Request failed');
  }

  const { data } = apiResponse;

  // Return tok agents IDs encoded as a hexadecimal string
  return Functions.encodeString(data.encodedIDs);
`;

const distributionRewards = [100, 50];

const deployment_config = [_unlockContract];

module.exports = {
  getAgentID,
  getTopKAgents,
  deployment_config,
  distributionRewards,
};
