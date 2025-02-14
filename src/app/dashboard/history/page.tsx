'use client';

import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

interface HistoryWacana {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate: string;
  donationAmount: string;
  verifier: string;
  status: 'completed' | 'failed';
  donationTx?: string;
}

export default function History() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data untuk contoh
  const [wacanas] = useState<HistoryWacana[]>([
    {
      id: '1',
      title: 'Belajar React',
      description: 'Menyelesaikan proyek portfolio dengan React dan Tailwind',
      targetDate: '2025-01-15T15:00',
      completedDate: '2025-01-14T14:30',
      donationAmount: '0.1',
      verifier: '0x1234...5678',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Diet Sehat',
      description: 'Menurunkan berat badan 5kg dalam sebulan',
      targetDate: '2025-01-31T23:59',
      completedDate: '2025-02-01T00:00',
      donationAmount: '0.05',
      verifier: '0x8765...4321',
      status: 'failed',
      donationTx: '0xabcd...efgh'
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

  const getStatusBadge = (status: HistoryWacana['status']) => {
    const badges = {
      completed: 'bg-green-500/20 text-green-300 border-green-500/30',
      failed: 'bg-red-500/20 text-red-300 border-red-500/30'
    };
    const labels = {
      completed: '✅ Berhasil',
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
              📜 Riwayat Wacana
            </h1>
            <p className="text-purple-100 mt-2">
              Daftar wacana yang telah selesai
            </p>
          </div>

          <div className="p-6 space-y-6">
            {wacanas.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p className="text-xl">Belum ada riwayat wacana</p>
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
                  
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
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
                      <span className="text-purple-400">Selesai:</span>
                      <div className="text-white">
                        {new Date(wacana.completedDate).toLocaleString('id-ID', {
                          dateStyle: 'medium',
                          timeStyle: 'short'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-purple-400">Donasi:</span>
                      <div className="text-white">{wacana.donationAmount} ETH</div>
                    </div>
                    <div>
                      <span className="text-purple-400">Verifikator:</span>
                      <div className="text-white">{wacana.verifier}</div>
                    </div>
                  </div>

                  {wacana.status === 'failed' && wacana.donationTx && (
                    <div className="mt-4 p-4 bg-purple-900/30 rounded-xl">
                      <p className="text-sm text-purple-300">
                        Donasi telah dikirim ke charity
                      </p>
                      <a
                        href={`https://etherscan.io/tx/${wacana.donationTx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-purple-400 hover:text-purple-300 break-all"
                      >
                        🔗 {wacana.donationTx}
                      </a>
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
