'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Home, Plus, Info } from 'lucide-react';
import Logo from './Logo';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === '/'
                  ? 'text-pink-500 bg-pink-50'
                  : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/browse"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === '/browse'
                  ? 'text-pink-500 bg-pink-50'
                  : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <Search className="w-5 h-5" />
              <span>Browse</span>
            </Link>
            <Link
              href="/submit"
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Submit</span>
            </Link>
            <Link
              href="/about"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                pathname === '/about'
                  ? 'text-pink-500 bg-pink-50'
                  : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <Info className="w-5 h-5" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 