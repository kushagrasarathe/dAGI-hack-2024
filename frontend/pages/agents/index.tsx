import CategoryBadge from "@/components/category-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
];

export default function Agents() {
  return (
    <div className="grid grid-cols-12 *:col-span-6 gap-4">
      {mockAgents.map((agent, idx) => (
        <div key={idx} className="w-ful">
          <AgentCard
            id={agent.id}
            name={agent.name}
            rating={agent.rating}
            desc={agent.desc}
            categories={agent.categories}
          />
        </div>
      ))}
    </div>
  );
}

const AgentCard = ({ name, id, rating, desc, categories }: AgentCardProps) => {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="leading-6 line-clamp-4">
          {desc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div>Categories: </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, idx) => (
              <CategoryBadge key={idx} index={idx} category={category} />
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link
          href={`/agent/${id}`}
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
        >
          Try
        </Link>
      </CardFooter>
    </Card>
  );
};
