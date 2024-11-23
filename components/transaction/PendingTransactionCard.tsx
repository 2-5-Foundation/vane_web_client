"use client";

import { Bell, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  from: string;
  amount: string;
  timestamp: string;
  codeword: string;
  status: string;
  network: string;
}

interface PendingTransactionCardProps {
  tx: Transaction;
}

export default function PendingTransactionCard({ tx }: PendingTransactionCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-all shadow-sm hover:shadow">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-900">Incoming Transfer</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {tx.network}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">{tx.timestamp}</span>
            <button className="text-slate-400 hover:text-slate-600">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">From Address</p>
            <p className="text-sm font-medium text-slate-900 font-mono">{tx.from}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Codeword</p>
            <p className="text-sm font-medium text-slate-900">{tx.codeword}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Amount</p>
            <p className="text-sm font-medium text-slate-900">{tx.amount}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded-md bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-colors">
            Reject
          </button>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-sm">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}