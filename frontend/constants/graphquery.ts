import { gql } from "@apollo/client";

export const allAgentsQuery = gql`
  query ($first: Int) {
    agents(first: 10) {
      agentCategory
      agentName
      versionNo
      agentID
      assistantId
      basisPoint
      isOpenForContributions
      keyPrice
      id
      unlockSubAddress
      isImprovedVersion
    }
  }
`;

// For a agent's info page
export const indivAgentQuery = gql`
  query ($id: String) {
    agent(id: $id) {
      agentCategory
      agentName
      versionNo
      AgentVersions {
        assistantId
        agentID
        creator {
          address
          id
        }
      }
      agentID
      assistantId
      basisPoint
      creator {
        address
        id
      }
      id
      isImprovedVersion
      isOpenForContributions
      keyPrice
      metadataCID
      parentAgent {
        agentID
        assistantId
      }
      unlockSubAddress
    }
  }
`;

//Could be used on Explore
export const allCreatorsQuery = gql`
  query ($first: Int) {
    creators(first: $first) {
      id
      address
      agentsCreated {
        id
        assistantId
        agentID
        agentName
        agentCategory
        keyPrice
        unlockSubAddress
        isOpenForContributions
      }
    }
  }
`;

export const indivCreatorQuery = gql`
  query ($id: String) {
    creator(id: $id) {
      address
      id
      agentsCreated {
        agentCategory
        agentID
        agentName
        versionNo
        assistantId
        basisPoint
        isOpenForContributions
        isImprovedVersion
        keyPrice
        unlockSubAddress
      }
    }
  }
`;

// For a User's profile
export const indivUserQuery = gql`
  query ($id: String) {
    user(id: $id) {
      address
      id
      agentsSubscribedTo {
        agentCreator {
          address
        }
        createdAt
        expiresAt
        id
        threadID
        tokenId
        agent {
          agentID
          assistantId
          agentName
          versionNo
          id
          unlockSubAddress
          isOpenForContributions
          agentCategory
          keyPrice
          basisPoint
        }
      }
    }
  }
`;

export const indivSubscriptionQuery = gql`
  query ($id: String) {
    subscriptionEntity(id: $id) {
      createdAt
      expiresAt
      id
      threadID
      tokenId
      agent {
        agentID
        versionNo
        assistantId
        id
      }
      agentCreator {
        address
        id
      }
      buyer {
        address
        id
      }
    }
  }
`;

export const indivLockQuery = gql`
  query ($id: String) {
    lock(id: $id) {
      address
      deployer
      id
      name
      price
      totalKeys
    }
  }
`;
