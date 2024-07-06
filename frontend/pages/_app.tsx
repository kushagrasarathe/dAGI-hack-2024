import Header from "@/components/header";
import "@/styles/globals.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Cairo as Font } from "next/font/google";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  holesky,
  mainnet,
  optimism,
  polygon,
} from "wagmi/chains";

const font = Font({ subsets: ["latin"] });

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, holesky],
  ssr: true,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className={`${font.className} md:max-w-7xl mx-auto`}>
            <Header />
            <div className="py-6">
              <Component {...pageProps} />{" "}
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
