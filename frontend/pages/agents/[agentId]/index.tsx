import CategoryBadge from "@/components/category-badge";
import CopyToClipboard from "@/components/copy-to-clipboard";
import RatingBadge from "@/components/rating-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { genConfig } from "react-nice-avatar";
import BuySubscription from "../buy-subscription";
import FeedbackReviews from "../feedback-reviews";
import { useRouter } from "next/router";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { contractABI, contractAddress } from "@/constants/contract";
import { getUser, getAgent, getSubscription } from "@/utils/graphFunctions";
import { addReview, getAgentFirebase, getReviews } from "@/firebase/functions";
import { formatEther } from "ethers";

const categories = ["action", "crime", "thriller"];

interface agentDataType {
  agentId: number;
  assistantId: number;
  agentName: string;
  agentDesciption: string;
  agentInstructions: string;
  agentRating: string;
  agentCategory: string;
  agentCreator: string;
  agentVersions: any[];
  agentPrice: bigint;
  agentBP: string;
  openForContribution: boolean;
}

export default function Agent() {
  const router = useRouter();
  const { address: userAccount } = useAccount();
  const _agentId = router.query.agentId as string;

  const [agentData, setAgentData] = useState<agentDataType>();
  const [agentReviews, setAgentReviews] = useState<any[]>();
  const [rating, setRating] = useState<number>(0);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [feedback, setFeedBack] = useState<string>("");

  const { address: account } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // const name = "John Wick";
  // const config = genConfig(name);
  const config = genConfig();

  const isUserSubscribed = async (agentID: number) => {
    if (!userAccount) {
      console.log("User Account not found");
      return;
    }

    const data = await getUser(userAccount);
    console.log(data);
    const agentsSubscribedTo = data.user?.agentsSubscribedTo;
    let subscribed = false;
    for (let i = 0; i < agentsSubscribedTo?.length; i++) {
      const assistantId = agentsSubscribedTo[i].agent.agentID;
      if (assistantId == agentID) {
        subscribed = true;
        break;
      }
    }
    setIsSubscribed(subscribed);
  };

  useEffect(() => {
    console.log(_agentId, typeof _agentId);
    if (_agentId && !agentData) {
      if (typeof _agentId == "string") {
        getAgentData(_agentId);
        if (userAccount) {
          // checkSubscription(_agentId);
          isUserSubscribed(Number(_agentId));
        }
      }
    }
  }, [router, userAccount]);

  const getAssistant = async (assistantID: string) => {
    console.log("Fetching thread... Calling OpenAI");
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
        // console.log(res);
        const data = await res.json();
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
    return data;
  };

  // get Assistant Data
  const getAgentData = async (
    agentId: string
  ): Promise<agentDataType | undefined> => {
    if (!agentId) {
      console.log("No agent Id found");
      return;
    }

    // TODO Convert AgentID to Bytes form
    // NO need now , graph can fetch data for this given agentID
    const agentIdBytes = agentId;
    console.log(agentIdBytes);
    const agentGraphData = (await getAgent(agentIdBytes)).agent;
    console.log(agentGraphData);

    // TODO , Convert the agent ID to the one given in params
    // get partial data from firebase
    const firebaseData = await getAgentFirebase(Number(agentId));
    console.log(firebaseData);

    // get Reviews
    const firebaseReviews = await getReviews(Number(agentId));
    console.log(firebaseReviews);
    /// only pass firebaseReviews who has review content in the object and not just rating

    const filteredReviews = firebaseReviews?.filter((review) => {
      if (review?.review) {
        return review;
      }
    });
    const reviews = firebaseReviews?.slice(0, 3);
    console.log(filteredReviews);
    setAgentReviews(reviews);

    // other partial from openAI

    // TODO : update the assistantID we get from graphQl
    // const assitantData = await getAssistant(agentGraphData?.assistantId);
    const assitantData: any = await getAssistant(agentGraphData?.assistantId);

    console.log(assitantData);
    const agentData: agentDataType = {
      agentId: agentGraphData?.agentID,
      assistantId: agentGraphData?.assistantId,
      agentName: agentGraphData?.agentName,
      agentDesciption: assitantData?.description,
      agentInstructions: assitantData?.instructions,
      agentRating: firebaseData?.avgRating,
      agentCategory: agentGraphData?.agentCategory,
      agentPrice: agentGraphData?.keyPrice, // convert to Ethers
      agentBP: agentGraphData?.basisPoint, // convert into %
      agentCreator: agentGraphData?.creator?.address,
      agentVersions: agentGraphData?.AgentVersions,
      openForContribution: agentGraphData?.isOpenForContributions,
    };
    console.log(agentData);
    setAgentData(agentData);
  };

  const formatBP = (basisPoint: number): number => {
    const bpPercent = basisPoint / 100;
    return bpPercent;
  };

  // check For Subscription when user hit useAgent
  const checkSubscription = async (agentId: string) => {
    try {
      // maybe possible via graphQl
      if (!userAccount) {
        console.log("user not found");
        return;
      }

      // // TODO : Check the subID again after the new graph V

      // console.log(subId);
      const subscriptionData = await getSubscription(
        `${userAccount}-${agentId}`
      );
      console.log("here: ", subscriptionData);
      // or Unlock protocol graphQl
      // Or contract balance ERC721 method
      setIsSubscribed(subscriptionData?.subscriptionEntity);
    } catch (error) {
      console.log(error);
    }
  };

  // if not then subscribe via Model
  const subscribeAgent = async () => {
    try {
      if (agentData?.agentPrice === undefined) {
        console.log("Agent Price not found");
        return;
      }
      if (agentData?.agentId === undefined) {
        console.log("Agent Price not found");
        return;
      }
      const threadId = await createThread();
      console.log(threadId?.id);
      if (threadId?.id == undefined) {
        console.log("Thread Id could not be created");
        return;
      }

      const data = await publicClient?.simulateContract({
        account,
        address: contractAddress,
        abi: contractABI,
        functionName: "purchaseSubscription",
        args: [agentData?.agentId, agentData?.agentPrice, threadId?.id],
        value: agentData?.agentPrice,
      });

      console.log(data);
      if (!walletClient || !data) {
        console.log("Wallet client or Tx Data not found");
        return;
      }
      const hash = await walletClient.writeContract(data?.request);
      console.log("Transaction Sent");

      if (!publicClient) {
        console.log("Public client not found");
        return;
      }
      const transaction = await publicClient.waitForTransactionReceipt({
        hash: hash,
      });
      console.log(transaction);

      router.push(`/agents/my-agents`);
    } catch (error) {
      console.log(error);
    }
  };

  const createThread = async (): Promise<void | { id: string } | undefined> => {
    try {
      console.log("creating thread... Calling OpenAI");
      if (!agentData?.assistantId) {
        console.log("Agent Details missing");
        return;
      }
      const data = await fetch("/api/openai/createThreads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          console.log(res);
          const data = await res.json();
          console.log(data);
          return {
            id: data?.id,
          };
        })
        .catch((err) => {
          console.log(err);
        });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getTime = (timestamp: number) => {
    var d = new Date(1382086394000);
    return d.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6 relative">
        <div className="col-span-4 h-fit sticky top-28 space-y-5">
          <div className="space-y-4 border rounded-lg p-4 shadow-[0px_0px_20px_0px_#edf2f7]">
            <div className="flex gap-2 justify-between">
              <div className="text-2xl font-semibold">John Wick</div>
              <RatingBadge rating={agentData ? agentData.agentRating : "N/A"} />
            </div>

            <div className="space-y-2">
              <div className="text-sm">Categories: </div>
              <div className="flex flex-wrap gap-2">
                {agentData && (
                  <CategoryBadge
                    key={agentData.agentCategory}
                    index={0}
                    category={agentData.agentCategory}
                  />
                )}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm">Creator: </div>
              <div className="flex gap-2">
                <div>
                  {agentData && agentData.agentCreator?.slice(0, 4)}...{" "}
                  {agentData && agentData.agentCreator?.slice(-4)}
                </div>
                <CopyToClipboard
                  text={agentData ? agentData.agentCreator : ""}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm">Version: </div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={agentData && agentData.agentId} />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectItem value="1.0">v1.0</SelectItem>
                  <SelectItem value="1.1">v1.1</SelectItem>
                  <SelectItem value="1.2">v1.2</SelectItem> */}
                  {agentData &&
                    agentData.agentVersions?.map((agentV) => {
                      return (
                        <SelectItem value={agentV.agendID}>
                          {agentV?.agentID}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>

            <Link
              href={`/agents/${agentData && agentData.agentId}/contribute`}
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              Contribute
            </Link>
            <BuySubscription
              agentId={agentData ? agentData.agentId.toString() : ""}
              price={agentData ? agentData.agentPrice : BigInt(0)}
              subscribe={subscribeAgent}
            />
          </div>
        </div>
        <div className="space-y-5 col-span-8 ">
          <div className="w-full col-span-8 col-start-5">
            <div className="border rounded-lg p-4 space-y-6 h-fit shadow-[0px_0px_20px_0px_#edf2f7]">
              <div className="flex gap-2 items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm">Price</div>
                  <div className="text-lg font-semibold">
                    {agentData && formatEther(agentData.agentPrice)} Ethers
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm">Duration</div>
                  <div className="text-lg font-semibold">1 Month</div>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2 items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm">Basis Point: </div>
                  <div className="text-lg font-semibold">
                    {agentData && formatBP(Number(agentData.agentBP))} %
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm">Open to Contributors</div>
                  <div className="text-lg font-semibold text-right">
                    {" "}
                    {agentData && agentData.openForContribution ? "Yes" : "No"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4 space-y-6 h-fit shadow-[0px_0px_20px_0px_#edf2f7]">
            <div className="space-y-2">
              <div className="font-semibold text-lg">Description</div>
              <div className="text-sm leading-6">
                {agentData && agentData.agentDesciption}
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-lg">Instructions</div>
              <div className="text-sm leading-6">
                {agentData && agentData.agentInstructions}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-between">
              <div className="font-semibold">Post Review</div>
              <FeedbackReviews />
            </div>
            <div className="space-y-4 border rounded-lg p-4 shadow-[0px_0px_20px_0px_#edf2f7]">
              <div className="space-y-2">
                <div>Rate Agent</div>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setRating(value)}
                      className={`text-xl focus:outline-none ${
                        value <= rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      {value <= rating ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 ">
                <span>Feedback</span>
                <Textarea
                  cols={4}
                  placeholder="e.g: lorem ipsum dolor sit amet...."
                  value={feedback}
                  onChange={(e) => setFeedBack(e.target.value)}
                />
              </div>
              <Button
                className="w-full mt-2"
                onClick={() =>
                  addReview(
                    Number(_agentId),
                    rating,
                    feedback,
                    `${userAccount}`
                  )
                }
              >
                Submit review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
