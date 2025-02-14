'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const NavItem = ({ href, children, isActive }: { 
  href: string, 
  children: React.ReactNode, 
  isActive?: boolean 
}) => (
  <Link 
    href={href} 
    className={`
      px-4 py-2 rounded-xl transition-all duration-300 
      ${isActive 
        ? 'bg-purple-600 text-white' 
        : 'text-purple-200 hover:bg-purple-700/30 hover:text-white'
      }
    `}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: '🏠 Dashboard' },
    { href: '/dashboard/create-wacana', label: '✍️ Buat Wacana' },
    { href: '/dashboard/active-wacana', label: '🎯 Wacana Aktif' },
    { href: '/dashboard/history', label: '📜 Riwayat' }
  ];

  return (
    <nav className="bg-purple-900/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard" 
            className="text-2xl font-bold text-white flex items-center"
          >
            🌟 AdaWacana
          </Link>
          <div className="hidden md:flex space-x-2 ml-6">
            {navItems.map((item) => (
              <NavItem 
                key={item.href} 
                href={item.href} 
                isActive={pathname === item.href}
              >
                {item.label}
              </NavItem>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <ConnectButton 
              showBalance={false} 
              accountStatus="address" 
            />
          </div>
          <div className="md:hidden">
            <button 
              className="text-white bg-purple-600 p-2 rounded-lg"
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className="md:hidden bg-purple-900/80 py-4">
        <div className="container mx-auto px-4 space-y-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.href} 
              href={item.href} 
              isActive={pathname === item.href}
            >
              {item.label}
            </NavItem>
          ))}
          <div className="pt-2">
            <ConnectButton 
              showBalance={false} 
              accountStatus="address" 
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
