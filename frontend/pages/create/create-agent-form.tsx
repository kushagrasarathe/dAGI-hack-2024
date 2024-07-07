import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { contractABI, contractAddress } from "@/constants/contract";
import { createAgent } from "@/firebase/functions";
import { getAgentID } from "@/utils/helpers";
import { parseEther } from "ethers";
import { CircleAlert, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export function AccountForm() {
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);

  const [assistantID, setAssistantID] = useState<string>();
  const [agentDetails, setAgentDetails] = useState<{
    agentName: string;
    agentDesc: string;
    agentInstruc: string;
    agentPrice: string;
    agentBP: string;
    agentCategory: string;
    agentImage: string | undefined;
  }>({
    agentName: "",
    agentDesc: "",
    agentPrice: "",
    agentInstruc: "",
    agentBP: "",
    agentCategory: "",
    agentImage: undefined,
  });
  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [threadID, setThreadID] = useState<string>();
  const [codeInterpreter, setCodeInterpreter] = useState<boolean>(false);
  const [fileInterpreter, setFileInterpreter] = useState<boolean>(false);

  const router = useRouter();

  const getTools = (): any[] => {
    let tools: any[] = [];

    if (codeInterpreter) {
      tools.push({
        type: "code_interpreter",
      });
    }

    if (fileInterpreter) {
      tools.push({
        type: "retrieval",
      });
    }

    return tools;
  };

  const createAssistant = () => {
    try {
      console.log("creating Assistant... Calling OpenAI");
      if (
        agentDetails.agentInstruc == "" &&
        agentDetails.agentDesc == "" &&
        agentDetails.agentName == ""
      ) {
        console.log("Agent Details missing");
        return;
      }
      const tools = getTools();
      setIsCreatingAgent(true);
      fetch("/api/openai/createAssistants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assistantName: agentDetails.agentName,
          assistantDesc: agentDetails.agentDesc,
          assistantInstruc: agentDetails.agentInstruc,
          tools: tools,
          fileIds: [],
        }),
      })
        .then(async (res) => {
          console.log(res);
          const data = await res.json();
          console.log(data);
          setAssistantID(data?.id);

          // peform the tx
          // @ts-ignore
          await registerAgent(data?.id);

          createAgent(getAgentID(data?.id));
        })
        .catch((err) => {
          console.log(err);
          setIsCreatingAgent(false);
        });
    } catch (error) {
      setIsCreatingAgent(false);
      console.log(error);
    }
  };

  const registerAgent = async (_assistantID: string) => {
    try {
      if (
        agentDetails.agentBP == "" &&
        agentDetails.agentPrice == "" &&
        agentDetails.agentName == ""
      ) {
        console.log("Agent Details missing");
        setIsCreatingAgent(false);
        return;
      }

      const data = await publicClient?.simulateContract({
        account,
        address: contractAddress,
        abi: contractABI,
        functionName: "registerAgent",
        args: [
          {
            agentName: _assistantID,
            agentID: getAgentID(_assistantID as string),
            subscriptionExpirationDuration: BigInt(0),
            tokenAddress: "0x0000000000000000000000000000000000000000",
            keyPrice: parseEther(agentDetails.agentPrice),
            basisPoint: BigInt(Number(agentDetails.agentBP) * 100),
            lockName: `Subscription for ${agentDetails.agentName}`,
            lockSymbol: "SOA",
            baseTokenURI: agentDetails.agentName,
            rewardCategory: "0x", // Reward Category 0 rating based - 1 tweetAds based - 2 email based
            actualCategory: agentDetails.agentCategory,
            isOpenForContributions: true,
          },
        ],
      });
      console.log(data);
      if (!walletClient || !publicClient) {
        console.log("Wallet client not found");
        setIsCreatingAgent(false);

        return;
      }
      // @ts-ignore
      const hash = await walletClient.writeContract(data.request);
      console.log("Transaction Sent");
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });
      console.log(transaction);
      setIsCreatingAgent(false);
      router.push(`/agents/${getAgentID(_assistantID)}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card className="p-4 space-y-4">
        <div className="space-y-2 ">
          <span>{`Agent's`} Name</span>
          <Input
            placeholder="e.g: John Wick"
            onChange={(e) =>
              setAgentDetails({
                ...agentDetails,
                agentName: e.target.value,
              })
            }
            value={agentDetails.agentName}
          />
        </div>
        <div className="space-y-2 ">
          <span>Instructions</span>
          <Textarea
            cols={4}
            placeholder="e.g: You are John Wick"
            onChange={(e) =>
              setAgentDetails({
                ...agentDetails,
                agentInstruc: e.target.value,
              })
            }
            value={agentDetails.agentInstruc}
          />
        </div>
        <div className="space-y-2 ">
          <span>Description</span>
          <Textarea
            cols={4}
            placeholder="e.g: The agent behaves just like John Wick whenever asked to do something"
            onChange={(e) =>
              setAgentDetails({
                ...agentDetails,
                agentDesc: e.target.value,
              })
            }
            value={agentDetails.agentDesc}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-normal gap-2 w-full">
            <Switch
              id="airplane-mode"
              onChange={() => setCodeInterpreter(!codeInterpreter)}
            />
            <span>Code Interpreter</span>
            <Tooltip desc="This allows the agent to interpret code" />
          </div>
          <div className="flex items-center justify-normal gap-2 w-full">
            <Switch
              id="airplane-mode"
              onChange={() => setFileInterpreter(!fileInterpreter)}
            />
            <span>File Retrieval </span>
            <Tooltip desc="This allows the agent to retrieve files from the internet" />
          </div>
        </div>
        <Separator />
        <div className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Configure Agent</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="space-y-2 ">
                  <span>{`Agent's Price`}</span>
                  <Input
                    placeholder="e.g: 0.05 ETH"
                    onChange={(e) =>
                      setAgentDetails({
                        ...agentDetails,
                        agentPrice: e.target.value,
                      })
                    }
                    value={agentDetails.agentPrice}
                  />
                </div>
                <div className="space-y-2 ">
                  <span>{`Basis point ( BP )`}</span>
                  <Input
                    placeholder="e.g: 10%"
                    onChange={(e) =>
                      setAgentDetails({
                        ...agentDetails,
                        agentBP: e.target.value,
                      })
                    }
                    value={agentDetails.agentBP}
                  />
                </div>
                <div className="space-y-2 ">
                  <span>{`Category`}</span>
                  <Input
                    placeholder="e.g: sattire, cinema"
                    onChange={(e) =>
                      setAgentDetails({
                        ...agentDetails,
                        agentCategory: e.target.value,
                      })
                    }
                  />
                </div>
                <Button variant={"secondary"} className="w-full">
                  Save Configuration
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="pt-4 flex items-center justify-between">
          <Button
            onClick={() => createAssistant()}
            disabled={isCreatingAgent}
            className="w-full"
          >
            {isCreatingAgent ? (
              <Loader2Icon className="size-4" />
            ) : (
              "Create Agent"
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}

const Tooltip = ({ desc }: { desc: string }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <CircleAlert className="size-4 cursor-pointer" />
      </HoverCardTrigger>
      <HoverCardContent align="center" className="mt-2">
        {desc}
      </HoverCardContent>
    </HoverCard>
  );
};
