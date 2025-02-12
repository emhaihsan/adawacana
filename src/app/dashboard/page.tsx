'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    } else {
      setIsLoading(false)
    }
  }, [isConnected, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white p-8">
      <div className="container mx-auto">
        {/* Header dengan Connect Wallet */}
        <div className="flex justify-end mb-8">
          <ConnectButton 
            showBalance={false}
            accountStatus="address"
          />
        </div>

        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Buat Wacana */}
          <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4">Buat Wacana Baru</h2>
            <Link 
              href="/dashboard/create-wacana" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:opacity-90 transition-all inline-block"
            >
              + Tambah Wacana
            </Link>
          </div>

          {/* Daftar Wacana */}
          <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/20">
            <h2 className="text-2xl font-semibold mb-4">Wacana Aktif</h2>
            <p className="text-gray-300">Belum ada wacana aktif.</p>
          </div>
        </div>

        {/* Informasi Wallet */}
        <div className="mt-12 bg-purple-900/20 p-6 rounded-2xl border border-purple-500/20">
          <h2 className="text-2xl font-semibold mb-4">Wallet Information</h2>
          <p>Address: <span className="break-all">{address}</span></p>
        </div>
      </div>
    </main>
  )
}
