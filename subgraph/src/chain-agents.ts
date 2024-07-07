import { BigInt } from "@graphprotocol/graph-ts";
import {
  agentRegistered as agentRegisteredEvent,
  agentSubscriptionPurchased as agentSubscriptionPurchasedEvent,
  agentVersionRegistered as agentVersionRegisteredEvent,
} from "../generated/ChainAgents/ChainAgents";
import { Agent, Creator, SubscriptionEntity, User } from "../generated/schema";

export function handleagentRegistered(event: agentRegisteredEvent): void {
  let creator = Creator.load(event.params.creator);
  if (creator == null) {
    creator = new Creator(event.params.creator);
    creator.address = event.params.creator;
    creator.totalRevenue = BigInt.zero();
    creator.save();
  }
  let entity = new Agent(event.params.agentID.toString());
  entity.agentName = event.params.baseTokenURI;
  entity.assistantId = event.params.agentName;
  entity.agentID = event.params.agentID;
  entity.creator = creator.id;
  entity.unlockSubAddress = event.params.unlockSubscriptionContract;
  entity.keyPrice = event.params.keyPrice;
  entity.basisPoint = event.params.basisPoint;
  entity.agentCategory = event.params.actualCategory;
  entity.totalRevenue = BigInt.zero();
  entity.versionNo = "1.0.0";
  entity.isOpenForContributions = event.params.isOpenForContributions;
  entity.isImprovedVersion = false;

  entity.save();
}

export function handleagentSubscriptionPurchased(
  event: agentSubscriptionPurchasedEvent
): void {
  let entity = new SubscriptionEntity(
    `${event.params.subscriber.toHexString()}-${event.params.agentID}`
  );

  let agent = Agent.load(event.params.agentID.toString());
  if (agent == null) {
    return;
  }
  const subscriptionAmount = agent.keyPrice;
  entity.agent = agent.id;
  agent.totalRevenue = agent.totalRevenue.plus(subscriptionAmount);
  agent.save();

  let creator = Creator.load(event.params.agentCreator);
  if (creator == null) {
    return;
  }

  entity.agentCreator = creator.id;

  if (agent.isImprovedVersion) {
    const referAmount = subscriptionAmount.times(
      agent.basisPoint.div(BigInt.fromI32(10000))
    );

    creator.totalRevenue = creator.totalRevenue.plus(referAmount);
    creator.save();
  } else {
    creator.totalRevenue = creator.totalRevenue.plus(subscriptionAmount);
    creator.save();
  }

  let user = User.load(event.params.subscriber);
  if (user == null) {
    user = new User(event.params.subscriber);
    user.address = event.params.subscriber;
    user.save();
  }

  entity.buyer = user.id;
  entity.threadID = event.params.threadID;
  entity.tokenId = event.params.tokenId;
  entity.createdAt = event.block.timestamp;
  entity.expiresAt = BigInt.fromI32(event.block.timestamp.toI32() + 2592000);

  entity.save();
}

export function handleagentVersionRegistered(
  event: agentVersionRegisteredEvent
): void {
  let creator = Creator.load(event.params.creator);
  if (creator == null) {
    creator = new Creator(event.params.creator);
    creator.address = event.params.creator;
    creator.totalRevenue = BigInt.zero();
    creator.save();
  }

  let entity = new Agent(event.params.agentVersionID.toString());

  let agent = Agent.load(event.params.agentID.toString());
  if (agent == null) {
    return;
  }

  entity.parentAgent = agent.id;

  entity.assistantId = event.params.agentVersionName;
  entity.agentID = event.params.agentVersionID;
  entity.versionNo = event.params.agentMetadataCID;
  entity.agentName = agent.agentName;
  entity.creator = creator.id;
  entity.metadataCID = event.params.agentMetadataCID;
  entity.unlockSubAddress = agent.unlockSubAddress;
  entity.keyPrice = agent.keyPrice;
  entity.basisPoint = agent.basisPoint;
  entity.agentCategory = agent.agentCategory;
  entity.isOpenForContributions = agent.isOpenForContributions;
  entity.totalRevenue = BigInt.zero();
  entity.isImprovedVersion = true;

  entity.save();
}
