'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

interface Wacana {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  donationAmount: string;
  verifier: string;
  status: 'pending' | 'verified' | 'failed';
}

export default function ActiveWacana() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data untuk contoh
  const [wacanas] = useState<Wacana[]>([
    {
      id: '1',
      title: 'Belajar Solidity',
      description: 'Menyelesaikan kursus Solidity dasar di Udemy',
      targetDate: '2025-03-01T15:00',
      donationAmount: '0.1',
      verifier: '0x1234...5678',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Workout Rutin',
      description: 'Gym 3x seminggu selama sebulan',
      targetDate: '2025-03-15T18:00',
      donationAmount: '0.05',
      verifier: '0x8765...4321',
      status: 'verified'
    }
  ]);

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    } else {
      setIsLoading(false);
    }
  }, [isConnected, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const getStatusBadge = (status: Wacana['status']) => {
    const badges = {
      pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      verified: 'bg-green-500/20 text-green-300 border-green-500/30',
      failed: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    const labels = {
      pending: '⏳ Menunggu Verifikasi',
      verified: '✅ Terverifikasi',
      failed: '❌ Gagal'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm border ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      <Navbar />
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="bg-purple-900/30 border border-purple-500/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center">
              🎯 Wacana Aktif
            </h1>
            <p className="text-purple-100 mt-2">
              Daftar wacana yang sedang berjalan
            </p>
          </div>

          <div className="p-6 space-y-6">
            {wacanas.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl">Belum ada wacana aktif</p>
                <button
                  onClick={() => router.push('/dashboard/create-wacana')}
                  className="mt-4 text-purple-400 hover:text-purple-300"
                >
                  + Buat Wacana Baru
                </button>
              </div>
            ) : (
              wacanas.map((wacana) => (
                <div
                  key={wacana.id}
                  className="bg-purple-900/20 border border-purple-500/20 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{wacana.title}</h3>
                    {getStatusBadge(wacana.status)}
                  </div>
                  
                  <p className="text-purple-200">{wacana.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">Target:</span>
                      <div className="text-white">
                        {new Date(wacana.targetDate).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </div>
                    </div>
                    <div>
                      <span className="text-purple-400">Donasi:</span>
                      <div className="text-white">{wacana.donationAmount} ETH</div>
                    </div>
                    <div>
                      <span className="text-purple-400">Verifikator:</span>
                      <div className="text-white">{wacana.verifier}</div>
                    </div>
                  </div>

                  {wacana.status === 'pending' && (
                    <div className="pt-4 flex space-x-4">
                      <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors">
                        ✅ Selesaikan
                      </button>
                      <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors">
                        ❌ Gagal
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
