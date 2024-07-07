import TrainAgent from "./train-agent";

import { getUser } from "@/utils/graphFunctions";
import { generateImage } from "@/utils/tools";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Index() {
  const { address: userAccount } = useAccount();
  const router = useRouter();
  const [threadID, setThreadID] = useState<string>();
  const [assistantID, setAssistantID] = useState<string>();
  const [inputPrompt, setInputPrompt] = useState<string>();
  const [subscriptionsData, setSubscriptionsData] = useState<any[]>();

  const getAssistant = async (assistantID: string) => {
    console.log("Fetching Assistant... Calling OpenAI");
    if (!assistantID) {
      console.log("Agent Details missing");
      return;
    }
    if (!assistantID.startsWith("asst_")) {
      return null;
    }
    const data = await fetch(
      `/api/openai/getAssistant?assistantId=${assistantID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  const getUserData = async () => {
    if (!userAccount) {
      console.log("User Account not found");
      return;
    }
    const data = await getUser(userAccount);
    console.log(data);
    const agentsSubscribedTo = data.user?.agentsSubscribedTo;
    let agentSubscriptionData = [];
    for (let i = 0; i < agentsSubscribedTo?.length; i++) {
      const assistantId = agentsSubscribedTo[i].agent.assistantId;
      const assistantData = await getAssistant(assistantId);
      console.log(assistantData);
      const agentSubscription = {
        agentName: assistantData?.name,
        agentId: agentsSubscribedTo[i].agent.agentID,
        assistantId: agentsSubscribedTo[i].agent.assistantId,
        threadID: agentsSubscribedTo[i].threadID,
      };
      agentSubscriptionData.push(agentSubscription);
    }
    setSubscriptionsData(agentSubscriptionData);
  };

  useEffect(() => {
    if (userAccount && !subscriptionsData) {
      getUserData();
    }
  }, [userAccount]);

  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 border rounded-lg">
          <div className="font-semibold text-lg tracking-tight p-4 border-b">
            Your Agents
          </div>
          <div className=" max-h-[74vh] overflow-auto">
            {subscriptionsData &&
              subscriptionsData.map((agent: any, idx) => (
                <button
                  key={idx}
                  className="space-y-1 border-b px-4 py-2 hover:bg-gray-100 cursor-pointer transition delay-100"
                  onClick={() => {
                    setAssistantID(agent.assistantId);

                    setThreadID(agent.threadID);
                  }}
                >
                  <div>{agent.agentName}</div>
                </button>
              ))}
          </div>
        </div>
        <div className="col-span-9 col-start-4 space-y-4">
          <TrainAgent
            threadID={threadID as string}
            assistantID={assistantID as string}
          />
        </div>
      </div>
    </div>
  );
}
