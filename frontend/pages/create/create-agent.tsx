import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AccountForm } from "./create-agent-form";

export default function CreateAgent() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Create Agent</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="shadow">
            <DrawerTitle>Create Agent</DrawerTitle>
          </DrawerHeader>
          <div className="relative px-5 py-5 max-h-[85vh] overflow-y-auto h-fit">
            <AccountForm />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
