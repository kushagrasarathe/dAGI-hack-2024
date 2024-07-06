import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function Header() {
  return (
    <div className="py-4 flex border-b items-center justify-between">
      <Link href={"/"} className="text-xl font-mono font-bold">
        AgentAI
      </Link>
      <ConnectButton />
    </div>
  );
}
