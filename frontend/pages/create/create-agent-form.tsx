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
import { CircleAlert, Loader2Icon } from "lucide-react";
import { useState } from "react";

export function AccountForm() {
  const [isCreatingAgent, setIsCreatingAgent] = useState(false);

  return (
    <div>
      <Card className="p-4 space-y-4">
        <div className="space-y-2 ">
          <span>{`Agent's`} Name</span>
          <Input placeholder="e.g: John Wick" />
        </div>
        <div className="space-y-2 ">
          <span>Instructions</span>
          <Textarea cols={4} placeholder="e.g: You are John Wick" />
        </div>
        <div className="space-y-2 ">
          <span>Description</span>
          <Textarea
            cols={4}
            placeholder="e.g: The agent behaves just like John Wick whenever asked to do something"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center justify-normal gap-2 w-full">
            <Switch id="airplane-mode" />
            <span>Code Interpreter</span>
            <Tooltip desc="This allows the agent to interpret code" />
          </div>
          <div className="flex items-center justify-normal gap-2 w-full">
            <Switch id="airplane-mode" />
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
                  <Input placeholder="e.g: 0.05 ETH" />
                </div>
                <div className="space-y-2 ">
                  <span>{`Basis point ( BP )`}</span>
                  <Input placeholder="e.g: 10%" />
                </div>
                <div className="space-y-2 ">
                  <span>{`Category`}</span>
                  <Input placeholder="e.g: sattire, cinema" />
                </div>
                <Button variant={"secondary"} className="w-full">
                  Save Configuration
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="pt-4 flex items-center justify-between">
          <Button className="w-full">
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
