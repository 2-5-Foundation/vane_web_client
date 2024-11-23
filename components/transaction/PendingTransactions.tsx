"use client";

import { Clock, Shield, ChevronDown } from 'lucide-react';
import PendingTransactionCard from './PendingTransactionCard';
import { useRouter } from 'next/navigation';

export default function PendingTransactions() {
  const router = useRouter();
  
  const pendingTx = [
    {
      id: '1',
      from: '0x7834...2951',
      amount: '2.5 ETH',
      timestamp: '2 min ago',
      codeword: 'BlueHorizon',
      status: 'awaiting_confirmation',
      network: 'Ethereum'
    },
    {
      id: '2',
      from: '0x9472...1836',
      amount: '500 USDT',
      timestamp: '5 min ago',
      codeword: 'SilverLight',
      status: 'processing',
      network: 'BSC'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-slate-900">Pending Transactions</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="w-4 h-4" />
            Auto-refreshing
          </div>
        </div>

        <div className="space-y-3">
          {pendingTx.map(tx => (
            <PendingTransactionCard key={tx.id} tx={tx} />
          ))}
        </div>
      </div>
    </div>
  );
}