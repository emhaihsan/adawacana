"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            AdaWacana
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            Turn Your Laziness Into Others&apos; Happiness
          </p>
          <p className="text-xl text-gray-400 max-w-2xl mb-12">
            Create commitments, set goals, and transform missed deadlines into
            charitable donations. Your procrastination now has a silver lining.
          </p>

          {!isConnected && (
            <div className="text-center">
              <p className="text-gray-300 mb-4">
                Connect your wallet to get started
              </p>
              <ConnectButton showBalance={false} accountStatus="address" />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Set Your Goals
            </h3>
            <p className="text-gray-400">
              Create a commitment with a deadline and stake some ETH as
              motivation.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Choose a Verifier
            </h3>
            <p className="text-gray-400">
              Select someone to verify your commitment completion.
            </p>
          </div>

          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Make a Difference
            </h3>
            <p className="text-gray-400">
              Complete your goal or your stake goes to charity. Win-win!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
