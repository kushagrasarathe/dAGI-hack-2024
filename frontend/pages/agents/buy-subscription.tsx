import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatEther } from "ethers";

interface BuySubscriptionProps {
  agentId: string;
  price: bigint;
  subscribe: () => void;
}

export default function BuySubscription(props: BuySubscriptionProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full shadow-inner" variant={"secondary"}>
          Buy Subscription
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Subscription</DialogTitle>
          <DialogDescription className="py-3 space-y-5">
            <div className="flex gap-2 items-center justify-between">
              <div className="space-y-1">
                <div className="text-sm">Price</div>
                <div>
                  {props.price ? formatEther(props.price).toString() : 0} ETH
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm">Duration</div>
                <div>1 Month</div>
              </div>
            </div>
            <Separator />
            <Button onClick={() => props.subscribe()} className="w-full">
              Subscribe
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
