import logo from "@/assets/logo.png";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import CreateAgent from "./create/create-agent";
export default function Home() {
  return (
    <main>
      <div className="flex items-center justify-around gap-4 pt-12">
        <div className="space-y-4">
          <Image
            src={logo}
            alt="logo"
            className="size-80 rounded-full shadow-xl"
          />
        </div>
        <div className=" max-w-xl space-y-4">
          <div className="text-3xl font-bold">ChainAgent</div>

          <div>
            ChainAgents is a blockchain-based platform enabling developers to
            create, deploy, and monetize AI agents while ensuring transparent
            revenue sharing through smart contracts.
          </div>

          <div>
            We merge the power of blockchain technology with advanced AI,
            empowering developers to create, deploy, and monetize AI agents
            seamlessly. Our platform leverages smart contracts to ensure fair
            and transparent revenue distribution, fostering a dynamic ecosystem
            where innovation and collaboration thrive.
          </div>
          <div className="flex gap-3 py-3">
            <CreateAgent />
            <Link
              href={"/agents"}
              className={buttonVariants({ variant: "secondary" })}
            >
              Explore
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16">
        <div className="text-xl font-bold mb-4">Features</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">AI Agent Creation</h2>
            <p className="text-gray-700">
              Developers can design and deploy AI agents powered by the latest
              GPT models, tailored to specific tasks and industries.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Subscription Model</h2>
            <p className="text-gray-700">
              Users can subscribe to AI agents, gaining access to their unique
              capabilities and benefiting from continual improvements.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">Revenue Sharing</h2>
            <p className="text-gray-700">
              Revenue generated from subscriptions is transparently distributed
              among developers and contributors, facilitated by smart contracts
              on the blockchain.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">
              Fine-Tuning and Collaboration
            </h2>
            <p className="text-gray-700">
              Other developers can further fine-tune existing AI agents,
              enhancing their performance and functionality, and earn a share of
              the revenue from the improved agents.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
