import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  agentRegistered,
  agentSubscriptionPurchased,
  agentVersionRegistered
} from "../generated/ChainAgents/ChainAgents"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createagentRegisteredEvent(
  agentName: string,
  baseTokenURI: string,
  agentID: BigInt,
  creator: Address,
  unlockSubscriptionContract: Address,
  keyPrice: BigInt,
  basisPoint: BigInt,
  rewardCategory: string,
  actualCategory: string,
  isOpenForContributions: boolean
): agentRegistered {
  let agentRegisteredEvent = changetype<agentRegistered>(newMockEvent())

  agentRegisteredEvent.parameters = new Array()

  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam("agentName", ethereum.Value.fromString(agentName))
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "baseTokenURI",
      ethereum.Value.fromString(baseTokenURI)
    )
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "agentID",
      ethereum.Value.fromUnsignedBigInt(agentID)
    )
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "unlockSubscriptionContract",
      ethereum.Value.fromAddress(unlockSubscriptionContract)
    )
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "keyPrice",
      ethereum.Value.fromUnsignedBigInt(keyPrice)
    )
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "basisPoint",
      ethereum.Value.fromUnsignedBigInt(basisPoint)
    )
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "rewardCategory",
      ethereum.Value.fromString(rewardCategory)
    )
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "actualCategory",
      ethereum.Value.fromString(actualCategory)
    )
  )
  agentRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "isOpenForContributions",
      ethereum.Value.fromBoolean(isOpenForContributions)
    )
  )

  return agentRegisteredEvent
}

export function createagentSubscriptionPurchasedEvent(
  agentID: BigInt,
  tokenId: BigInt,
  threadID: string,
  agentCreator: Address,
  subscriber: Address
): agentSubscriptionPurchased {
  let agentSubscriptionPurchasedEvent = changetype<agentSubscriptionPurchased>(
    newMockEvent()
  )

  agentSubscriptionPurchasedEvent.parameters = new Array()

  agentSubscriptionPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "agentID",
      ethereum.Value.fromUnsignedBigInt(agentID)
    )
  )
  agentSubscriptionPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  agentSubscriptionPurchasedEvent.parameters.push(
    new ethereum.EventParam("threadID", ethereum.Value.fromString(threadID))
  )
  agentSubscriptionPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "agentCreator",
      ethereum.Value.fromAddress(agentCreator)
    )
  )
  agentSubscriptionPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "subscriber",
      ethereum.Value.fromAddress(subscriber)
    )
  )

  return agentSubscriptionPurchasedEvent
}

export function createagentVersionRegisteredEvent(
  agentID: BigInt,
  agentVersionName: string,
  agentVersionID: BigInt,
  creator: Address,
  agentMetadataCID: string
): agentVersionRegistered {
  let agentVersionRegisteredEvent = changetype<agentVersionRegistered>(
    newMockEvent()
  )

  agentVersionRegisteredEvent.parameters = new Array()

  agentVersionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "agentID",
      ethereum.Value.fromUnsignedBigInt(agentID)
    )
  )
  agentVersionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "agentVersionName",
      ethereum.Value.fromString(agentVersionName)
    )
  )
  agentVersionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "agentVersionID",
      ethereum.Value.fromUnsignedBigInt(agentVersionID)
    )
  )
  agentVersionRegisteredEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  agentVersionRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "agentMetadataCID",
      ethereum.Value.fromString(agentMetadataCID)
    )
  )

  return agentVersionRegisteredEvent
}
