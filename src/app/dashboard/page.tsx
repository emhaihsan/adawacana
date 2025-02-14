"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [isConnected, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">Please connect your wallet first</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Link
                href="/dashboard/create-wacana"
                className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition-colors"
              >
                Create New Wacana
              </Link>
              <Link
                href="/dashboard/validate"
                className="block w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-center transition-colors"
              >
                Validate Wacana
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Your Stats
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Active Wacana</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
              <div>
                <p className="text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div>
                <p className="text-gray-400">Total Donated</p>
                <p className="text-2xl font-bold text-white">2.5 ETH</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-white">Completed: Learn Solidity</p>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>
              <div className="border-l-4 border-red-500 pl-4">
                <p className="text-white">Failed: Daily Workout</p>
                <p className="text-sm text-gray-400">5 days ago</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-white">Created: Write a Book</p>
                <p className="text-sm text-gray-400">1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
