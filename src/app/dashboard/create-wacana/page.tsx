"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function CreateWacana() {
  const { isConnected, address } = useAccount();
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
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Please connect your wallet first</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        {/* Header dengan Connect Wallet */}
        <div className="flex justify-end mb-8">
          <ConnectButton showBalance={false} accountStatus="address" />
        </div>

        <div className="bg-purple-900/30 border border-purple-500/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              📝 Buat Wacana Baru
            </h1>
            <p className="text-purple-100 mt-2">
              Tentukan komitmen Anda dan transformasikan prokrastinasi menjadi
              dampak positif
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                >
                  👤 Judul Wacana
                </label>
                <input
                  type="text"
                  id="title"
                  value={wacanaTitle}
                  onChange={(e) => setWacanaTitle(e.target.value)}
                  required
                  className="w-full bg-purple-900/50 border border-purple-500/30 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Apa wacana Anda?"
                />
              </div>

              <div>
                <label
                  htmlFor="targetDateTime"
                  className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                >
                  📅 Tanggal & Waktu Target
                </label>
                <input
                  type="datetime-local"
                  id="targetDateTime"
                  value={targetDateTime}
                  onChange={(e) => setTargetDateTime(e.target.value)}
                  required
                  className="w-full bg-purple-900/50 border border-purple-500/30 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
              >
                📖 Deskripsi Wacana
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full bg-purple-900/50 border border-purple-500/30 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Jelaskan detail wacana Anda secara komprehensif"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="donationAmount"
                  className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                >
                  💰 Jumlah Donasi (ETH)
                </label>
                <input
                  type="number"
                  id="donationAmount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  required
                  step="0.01"
                  min="0"
                  className="w-full bg-purple-900/50 border border-purple-500/30 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Berapa ETH yang dipertaruhkan"
                />
              </div>

              <div>
                <label
                  htmlFor="verifierAddress"
                  className="block text-sm font-medium text-gray-300 mb-2 flex items-center"
                >
                  👥 Alamat Wallet Verifikator
                </label>
                <input
                  type="text"
                  id="verifierAddress"
                  value={verifierAddress}
                  onChange={(e) => setVerifierAddress(e.target.value)}
                  required
                  className="w-full bg-purple-900/50 border border-purple-500/30 rounded-xl p-3 text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder="Alamat wallet teman Anda"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:opacity-90 transition-all font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transform hover:-translate-y-1"
              >
                Buat Wacana Sekarang
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
