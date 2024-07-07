import { AbiCoder, keccak256 } from "ethers";

export const getAgentID = (agentNameID: string) => {
  const abi = new AbiCoder();

  let agentId_bytes = abi.encode(["string"], [agentNameID]);

  const agent_bytes32 = keccak256(agentId_bytes);
  // Convert the bytes32 value to a BigInt
  const uint256Value = BigInt(agent_bytes32);

  // Perform the uint64 conversion
  const uint64Value = uint256Value & BigInt("0xFFFFFFFFFFFFFFFF");

  // Perform the uint32 conversion
  const uint32Value = Number(uint64Value & BigInt("0xFFFFFFFF"));

  return uint32Value;
};
