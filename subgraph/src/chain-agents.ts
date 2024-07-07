import {
  OwnershipTransferred as OwnershipTransferredEvent,
  agentRegistered as agentRegisteredEvent,
  agentSubscriptionPurchased as agentSubscriptionPurchasedEvent,
  agentVersionRegistered as agentVersionRegisteredEvent
} from "../generated/ChainAgents/ChainAgents"
import {
  OwnershipTransferred,
  agentRegistered,
  agentSubscriptionPurchased,
  agentVersionRegistered
} from "../generated/schema"

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleagentRegistered(event: agentRegisteredEvent): void {
  let entity = new agentRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agentName = event.params.agentName
  entity.baseTokenURI = event.params.baseTokenURI
  entity.agentID = event.params.agentID
  entity.creator = event.params.creator
  entity.unlockSubscriptionContract = event.params.unlockSubscriptionContract
  entity.keyPrice = event.params.keyPrice
  entity.basisPoint = event.params.basisPoint
  entity.rewardCategory = event.params.rewardCategory
  entity.actualCategory = event.params.actualCategory
  entity.isOpenForContributions = event.params.isOpenForContributions

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleagentSubscriptionPurchased(
  event: agentSubscriptionPurchasedEvent
): void {
  let entity = new agentSubscriptionPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agentID = event.params.agentID
  entity.tokenId = event.params.tokenId
  entity.threadID = event.params.threadID
  entity.agentCreator = event.params.agentCreator
  entity.subscriber = event.params.subscriber

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleagentVersionRegistered(
  event: agentVersionRegisteredEvent
): void {
  let entity = new agentVersionRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.agentID = event.params.agentID
  entity.agentVersionName = event.params.agentVersionName
  entity.agentVersionID = event.params.agentVersionID
  entity.creator = event.params.creator
  entity.agentMetadataCID = event.params.agentMetadataCID

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
