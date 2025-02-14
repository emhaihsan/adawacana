"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
            AdaWacana
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            Turn Your Laziness Into Other's Happiness
          </p>
          <p className="text-xl text-gray-300 max-w-2xl mb-12">
            Create commitments, set goals, and transform missed deadlines into
            charitable donations. Your procrastination now has a silver lining.
          </p>

          {!isConnected && (
            <div className="text-center">
              <p className="text-white mb-4">
                Connect your wallet to get started
              </p>
              <ConnectButton showBalance={false} accountStatus="address" />
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-purple-900/20 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
            <div className="text-purple-400 text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Set Your Goals
            </h3>
            <p className="text-gray-300">
              Create your commitment and set a deadline. Define your stake in
              case you miss it.
            </p>
          </div>

          <div className="bg-purple-900/20 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
            <div className="text-purple-400 text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Choose Verifier
            </h3>
            <p className="text-gray-300">
              Select a friend to verify your progress and hold you accountable.
            </p>
          </div>

          <div className="bg-purple-900/20 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
            <div className="text-purple-400 text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Make Impact
            </h3>
            <p className="text-gray-300">
              Missed deadlines transform into charitable donations, making every
              outcome meaningful.
            </p>
          </div>
        </div>

        {/* Web3 Elements */}
        <div className="mt-20 text-center">
          <div className="inline-flex gap-4 items-center justify-center bg-purple-900/20 px-6 py-3 rounded-full border border-purple-500/20">
            <span className="text-purple-300">Powered by</span>
            <div className="flex gap-3 items-center">
              <span className="text-white font-semibold">Manta Network</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
