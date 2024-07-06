import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export default function Header() {
  return (
    <div className="py-4 flex items-center justify-between">
      <div>AgentAI</div>
      <ConnectButton />
    </div>
  );
}
