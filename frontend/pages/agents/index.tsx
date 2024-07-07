import CategoryBadge from "@/components/category-badge";
import RatingBadge from "@/components/rating-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAvgRating } from "@/firebase/functions";
import { cn } from "@/lib/utils";
import { getAllAgents } from "@/utils/graphFunctions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useChainId } from "wagmi";

interface AgentCardProps {
  id: string;
  name: string;
  rating: string;
  desc: string;
  categories: Array<string>;
}

const mockAgents: Array<AgentCardProps> = [
  {
    id: "1",
    name: "John Wick",
    rating: "4.5",
    desc: "The agent behaves just like John Wick whenever asked to do something",
    categories: ["action", "crime", "thriller"],
  },
  {
    id: "2",
    name: "John Wick",
    rating: "4.5",
    desc: "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus suscipit reprehenderit labore alias non placeat ratione debitis reiciendis eius veniam. Animi rerum inventore neque, sit unde deleniti enim in perspiciatis! Quod, nulla id? Quam qui illum tempore magni! Cupiditate rerum illum harum ducimus. Labore ea blanditiis commodi ab repellat esse explicabo, quas distinctio sed quod vel tempora perspiciatis et cupiditate. Nisi excepturi eligendi obcaecati hic culpa quis eveniet at blanditiis esse voluptatum dicta quae ad sed eaque dolores tempore neque harum dolor quas, ratione facere illum nobis iure a! Sequi?",
    categories: ["action", "crime", "thriller"],
  },
  {
    id: "2",
    name: "John Wick",
    rating: "4.5",
    desc: "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus suscipit reprehenderit labore alias non placeat ratione debitis reiciendis eius veniam. Animi rerum inventore neque, sit unde deleniti enim in perspiciatis! Quod, nulla id? Quam qui illum tempore magni! Cupiditate rerum illum harum ducimus. Labore ea blanditiis commodi ab repellat esse explicabo, quas distinctio sed quod vel tempora perspiciatis et cupiditate. Nisi excepturi eligendi obcaecati hic culpa quis eveniet at blanditiis esse voluptatum dicta quae ad sed eaque dolores tempore neque harum dolor quas, ratione facere illum nobis iure a! Sequi?",
    categories: ["action", "crime", "thriller"],
  },
  {
    id: "1",
    name: "John Wick",
    rating: "4.5",
    desc: "The agent behaves just like John Wick whenever asked to do something",
    categories: ["action", "crime", "thriller"],
  },
  {
    id: "1",
    name: "John Wick",
    rating: "1.5",
    desc: "The agent behaves just like John Wick whenever asked to do something",
    categories: ["action", "crime", "thriller"],
  },
  {
    id: "2",
    name: "John Wick",
    rating: "4.5",
    desc: "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus suscipit reprehenderit labore alias non placeat ratione debitis reiciendis eius veniam. Animi rerum inventore neque, sit unde deleniti enim in perspiciatis! Quod, nulla id? Quam qui illum tempore magni! Cupiditate rerum illum harum ducimus. Labore ea blanditiis commodi ab repellat esse explicabo, quas distinctio sed quod vel tempora perspiciatis et cupiditate. Nisi excepturi eligendi obcaecati hic culpa quis eveniet at blanditiis esse voluptatum dicta quae ad sed eaque dolores tempore neque harum dolor quas, ratione facere illum nobis iure a! Sequi?",
    categories: ["action", "crime", "thriller"],
  },
  {
    id: "2",
    name: "John Wick",
    rating: "4.5",
    desc: "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus suscipit reprehenderit labore alias non placeat ratione debitis reiciendis eius veniam. Animi rerum inventore neque, sit unde deleniti enim in perspiciatis! Quod, nulla id? Quam qui illum tempore magni! Cupiditate rerum illum harum ducimus. Labore ea blanditiis commodi ab repellat esse explicabo, quas distinctio sed quod vel tempora perspiciatis et cupiditate. Nisi excepturi eligendi obcaecati hic culpa quis eveniet at blanditiis esse voluptatum dicta quae ad sed eaque dolores tempore neque harum dolor quas, ratione facere illum nobis iure a! Sequi?",
    categories: ["action", "crime", "thriller"],
  },
  {
    id: "1",
    name: "John Wick",
    rating: "4.5",
    desc: "The agent behaves just like John Wick whenever asked to do something",
    categories: ["action", "crime", "thriller"],
  },
];

interface agentDataType {
  agentId: number;
  assistantId: number;
  agentName: string;
  agentDesciption: string;
  agentRating: string;
  agentCategory: string;
}

export default function Agents() {
  const chainID = useChainId();
  const [agentsData, setAgentsData] = useState<agentDataType[] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Explore agent page
  const getAgentData = async (
    agentGraphData: any
  ): Promise<agentDataType | undefined> => {
    if (!agentGraphData) {
      console.log("No agent Data found");
      return;
    }
    // get partial data from firebase
    const firebaseData = await getAvgRating(agentGraphData?.agentID);
    console.log(firebaseData);
    // other partial from openAI
    // TODO : update the assistantID we get from graphQl
    // const assitantData = await getAssistant(agentGraphData?.assistantId);
    const assitantData: any = await getAssistant(agentGraphData?.assistantId);
    console.log(assitantData);
    const agentData: agentDataType = {
      agentId: agentGraphData?.agentID,
      assistantId: agentGraphData?.assistantId,
      agentName: assitantData?.name,
      agentDesciption: assitantData?.description,
      agentRating: firebaseData?.toString() || "0",
      agentCategory: agentGraphData?.agentCategory,
    };
    return agentData;
  };

  const getAgents = async () => {
    try {
      setIsLoading(true);
      const data = await getAllAgents(10);
      console.log(data);
      console.log(data.agents);

      const promises = [];
      if (data.agents.length) {
        for (let i = 0; i < data.agents.length; i++) {
          const agentData = getAgentData(data?.agents[i]);
          promises.push(agentData);
        }
      }

      const agentsData = await Promise.all(promises);
      console.log(agentsData);
      if (agentsData) {
        // @ts-ignore
        setAgentsData(agentsData);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!agentsData) {
      getAgents();
    }
  }, [chainID]);

  const router = useRouter();

  return (
    <div className="space-y-6 text-2xl font-semibold">
      <div>Explore</div>
      <div className="grid grid-cols-12 *:col-span-12 md:*:col-span-6 gap-6">
        {agentsData &&
          agentsData.map((agent, idx) => (
            <div key={idx} className="w-ful">
              <AgentCard
                id={agent.agentId.toString()}
                name={agent.agentName}
                rating={agent.agentRating}
                desc={agent.agentDesciption}
                categories={[agent.agentCategory]}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

const AgentCard = ({ name, id, rating, desc, categories }: AgentCardProps) => {
  return (
    <Card className="flex flex-col w-full h-full hover:shadow-inner transition duration-75 hover:bg-gray-50 delay-100">
      <CardHeader>
        <CardTitle className="flex gap-2 justify-between">
          <div>{name}</div>
          <RatingBadge rating={rating} />
        </CardTitle>
        <CardDescription className="leading-6 line-clamp-4">
          {desc}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <div className="space-y-1">
          <div>Categories: </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, idx) => (
              <CategoryBadge key={idx} index={idx} category={category} />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/agents/${id}`}
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
        >
          Try
        </Link>
      </CardFooter>
    </Card>
  );
};
