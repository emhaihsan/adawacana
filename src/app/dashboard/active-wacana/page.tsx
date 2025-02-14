"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface Wacana {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  donationAmount: string;
  verifier: string;
  status: "pending" | "verified" | "failed";
}

export default function ActiveWacana() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data untuk contoh
  const [wacanas] = useState<Wacana[]>([
    {
      id: "1",
      title: "Belajar Solidity",
      description: "Menyelesaikan kursus Solidity dasar di Udemy",
      targetDate: "2025-03-01T15:00",
      donationAmount: "0.1",
      verifier: "0x1234...5678",
      status: "pending",
    },
    {
      id: "2",
      title: "Workout Rutin",
      description: "Gym 3x seminggu selama sebulan",
      targetDate: "2025-03-15T18:00",
      donationAmount: "0.05",
      verifier: "0x8765...4321",
      status: "verified",
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
      case "pending":
        return "bg-yellow-600";
      case "verified":
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
        <h1 className="text-3xl font-bold text-white mb-8">Active Wacana</h1>

        <div className="grid gap-6">
          {wacanas.map((wacana) => (
            <div
              key={wacana.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {wacana.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{wacana.description}</p>
                </div>
                <span
                  className={`px-3 py-1 ${getStatusColor(
                    wacana.status
                  )} text-white rounded-full text-sm`}
                >
                  {wacana.status.charAt(0).toUpperCase() +
                    wacana.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400">Verifier</p>
                  <p className="text-white font-mono">{wacana.verifier}</p>
                </div>
                <div>
                  <p className="text-gray-400">Donation Amount</p>
                  <p className="text-white">{wacana.donationAmount} ETH</p>
                </div>
                <div>
                  <p className="text-gray-400">Target Date</p>
                  <p className="text-white">
                    {new Date(wacana.targetDate).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => alert("Konfirmasi selesai!")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Konfirmasi Selesai
                </button>
                <button
                  onClick={() => alert("Konfirmasi gagal!")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Konfirmasi Gagal
                </button>
              </div>
            </div>
          ))}

          {wacanas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Tidak ada wacana aktif saat ini
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
