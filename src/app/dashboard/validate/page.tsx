"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useEffect } from "react";

export default function ValidatePage() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  // Data statis untuk wacana yang perlu divalidasi
  const wacanaToValidate = [
    {
      id: 1,
      title: "Belajar Solidity dalam 30 Hari",
      description:
        "Menyelesaikan kursus Solidity dan membuat smart contract sederhana",
      creator: "0x1234...5678",
      deadline: "2025-03-14",
      stake: "0.5 ETH",
      status: "Menunggu Validasi",
    },
    {
      id: 2,
      title: "Membuat 5 NFT Collection",
      description: "Mendesain dan deploy 5 NFT collection di OpenSea",
      creator: "0x8765...4321",
      deadline: "2025-03-20",
      stake: "1 ETH",
      status: "Creator Sudah Konfirmasi",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Wacana untuk Divalidasi
        </h1>

        <div className="grid gap-6">
          {wacanaToValidate.map((wacana) => (
            <div
              key={wacana.id}
              className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {wacana.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{wacana.description}</p>
                </div>
                <span className="px-3 py-1 bg-yellow-600 text-white rounded-full text-sm">
                  {wacana.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400">Creator</p>
                  <p className="text-white font-mono">{wacana.creator}</p>
                </div>
                <div>
                  <p className="text-gray-400">Stake</p>
                  <p className="text-white">{wacana.stake}</p>
                </div>
                <div>
                  <p className="text-gray-400">Deadline</p>
                  <p className="text-white">{wacana.deadline}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => alert("Validasi berhasil!")}
                >
                  Validasi Selesai
                </button>
                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => alert("Wacana ditandai gagal!")}
                >
                  Tandai Gagal
                </button>
              </div>
            </div>
          ))}
        </div>

        {wacanaToValidate.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Tidak ada wacana yang perlu divalidasi saat ini
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
