import CreateAgent from "@/pages/create/create-agent";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Header() {
  return (
    <div className="py-4 flex border-b items-center justify-between shadow fixed w-full bg-white px-20 z-50">
      <div className="flex items-center justify-normal gap-5">
        <Link href={"/"} className="text-xl font-mono font-bold">
          AgentAI
        </Link>
        <div className="flex items-center justify-normal gap-3">
          <Link href={"/agents"}>Explore</Link>
        </div>
      </div>
      <div className="flex gap-4">
        <CreateAgent />
        <ConnectButton />
      </div>
    </div>
  );
}
