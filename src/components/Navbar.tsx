"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "bg-gray-800" : "";
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo dan Brand */}
          <Link href="/dashboard" className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
              AdaWacana
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard"
              )}`}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/create-wacana"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/create-wacana"
              )}`}
            >
              Buat Wacana
            </Link>
            <Link
              href="/dashboard/active-wacana"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/active-wacana"
              )}`}
            >
              Wacana Aktif
            </Link>
            <Link
              href="/dashboard/validate"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/validate"
              )}`}
            >
              Validasi
            </Link>
            <Link
              href="/dashboard/history"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/history"
              )}`}
            >
              Riwayat
            </Link>
          </div>

          {/* Connect Wallet Button */}
          <div className="flex items-center">
            <ConnectButton
              chainStatus="icon"
              showBalance={false}
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
            />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard"
              )}`}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/create-wacana"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/create-wacana"
              )}`}
            >
              Buat Wacana
            </Link>
            <Link
              href="/dashboard/active-wacana"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/active-wacana"
              )}`}
            >
              Wacana Aktif
            </Link>
            <Link
              href="/dashboard/validate"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/validate"
              )}`}
            >
              Validasi
            </Link>
            <Link
              href="/dashboard/history"
              className={`px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors ${isActive(
                "/dashboard/history"
              )}`}
            >
              Riwayat
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
