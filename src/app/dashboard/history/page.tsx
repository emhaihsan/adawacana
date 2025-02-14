"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface WacanaHistory {
  id: string;
  title: string;
  description: string;
  completedDate: string;
  donationAmount: string;
  verifier: string;
  status: "completed" | "failed";
}

export default function History() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data untuk contoh
  const [histories] = useState<WacanaHistory[]>([
    {
      id: "1",
      title: "Belajar React",
      description: "Menyelesaikan kursus React di Udemy",
      completedDate: "2025-01-15T10:00",
      donationAmount: "0.15",
      verifier: "0x1234...5678",
      status: "completed",
    },
    {
      id: "2",
      title: "Menulis Blog",
      description: "Menulis 5 artikel teknis di blog pribadi",
      completedDate: "2025-01-20T14:30",
      donationAmount: "0.08",
      verifier: "0x8765...4321",
      status: "failed",
    },
    {
      id: "3",
      title: "Belajar Solidity",
      description: "Membuat smart contract sederhana",
      completedDate: "2025-02-01T09:15",
      donationAmount: "0.12",
      verifier: "0x9876...1234",
      status: "completed",
    },
  ]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "failed":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">History</h1>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Total Wacana
            </h2>
            <p className="text-3xl font-bold text-white">{histories.length}</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Success Rate
            </h2>
            <p className="text-3xl font-bold text-white">
              {Math.round(
                (histories.filter((h) => h.status === "completed").length /
                  histories.length) *
                  100
              )}
              %
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              Total Donated
            </h2>
            <p className="text-3xl font-bold text-white">
              {histories
                .filter((h) => h.status === "failed")
                .reduce((acc, curr) => acc + parseFloat(curr.donationAmount), 0)
                .toFixed(2)}{" "}
              ETH
            </p>
          </div>
        </div>

        {/* History List */}
        <div className="grid gap-6">
          {histories.map((history) => (
            <div
              key={history.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {history.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{history.description}</p>
                </div>
                <span
                  className={`px-3 py-1 ${getStatusColor(
                    history.status
                  )} text-white rounded-full text-sm`}
                >
                  {history.status.charAt(0).toUpperCase() +
                    history.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-gray-400">Verifier</p>
                  <p className="text-white font-mono">{history.verifier}</p>
                </div>
                <div>
                  <p className="text-gray-400">Amount</p>
                  <p className="text-white">{history.donationAmount} ETH</p>
                </div>
                <div>
                  <p className="text-gray-400">Completed Date</p>
                  <p className="text-white">
                    {new Date(history.completedDate).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {histories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Belum ada riwayat wacana</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
