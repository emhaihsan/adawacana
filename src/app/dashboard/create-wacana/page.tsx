"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navbar from "@/components/Navbar";

export default function CreateWacana() {
  const { isConnected } = useAccount();
  const router = useRouter();

  const [wacanaTitle, setWacanaTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDateTime, setTargetDateTime] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [verifierAddress, setVerifierAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual submission logic
    console.log({
      wacanaTitle,
      description,
      targetDateTime,
      donationAmount,
      verifierAddress,
    });
    // Temporary redirect after submission
    router.push("/dashboard");
  };

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
      <main className="container mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Create New Wacana
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={wacanaTitle}
                  onChange={(e) => setWacanaTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="What do you want to achieve?"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-300 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  rows={4}
                  placeholder="Describe your commitment in detail"
                  required
                />
              </div>

              <div>
                <label htmlFor="deadline" className="block text-gray-300 mb-2">
                  Target Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="deadline"
                  value={targetDateTime}
                  onChange={(e) => setTargetDateTime(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-gray-300 mb-2">
                  Donation Amount (ETH)
                </label>
                <input
                  type="number"
                  id="amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="0.1"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div>
                <label htmlFor="verifier" className="block text-gray-300 mb-2">
                  Verifier Address
                </label>
                <input
                  type="text"
                  id="verifier"
                  value={verifierAddress}
                  onChange={(e) => setVerifierAddress(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="0x..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Create Wacana
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
