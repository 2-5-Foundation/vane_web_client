"use client";

import { Logo } from '@/components/ui/logo';
import { Wallet, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo*/}
          <div 
            onClick={() => router.push('/')}
            className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent cursor-pointer"
          >
             <Logo className="w-8 h-8 text-slate-900" />
              <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              
            </span>
          </div>
          {/* Logo*/}
          <div className="flex items-center gap-6 text-sm">
              {/* Pending */}
              <button 
              onClick={() => router.push('/pending')}
              className={`${
                pathname === '/pending' 
                  ? 'text-slate-900 font-medium' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending
            </button>
            {/* Receive */}
            <button 
              onClick={() => router.push('/receive')}
              className={`${
                pathname === '/receive' 
                  ? 'text-slate-900 font-medium' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Receive
            </button> 
            {/* Dashboard */}
            <button 
              onClick={() => router.push('/dashboard')}
              className={`${
                pathname === '/dashboard' 
                  ? 'text-slate-900 font-medium' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dashboard
            </button>
      
            {/* History */}
            <button className="text-slate-600 hover:text-slate-900">History</button>
            {/* Settings */}
            <button className="text-slate-600 hover:text-slate-900">Settings</button>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm 
          bg-slate-50 hover:bg-slate-100 active:bg-slate-200 
          text-slate-600 hover:text-slate-800 active:text-slate-900
          transition-all duration-200 ease-in-out
          transform hover:scale-105 active:scale-95">
          <Wallet className="w-4 h-4" />
          Account
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}