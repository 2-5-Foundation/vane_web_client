"use client";

import PendingTransactionCard from './PendingTransactionCard';
import { useRouter } from 'next/navigation';
import { useInitializeWebSocket, useTransactionStore } from '@/lib/useStore';
import { RefreshCw } from 'lucide-react';


export default function PendingTransactions() {
  const recvTransactions = useTransactionStore(state => state.recvTransactions);
  const removeRecvTransaction = useTransactionStore(state => state.removeRecvTransaction);
  const vaneClient = useTransactionStore(state => state.vaneClient);
  const initializeWebSocket = useTransactionStore(state => state.initializeWebSocket);
  const sortTransactionsUpdates = useTransactionStore(state => state.sortTransactionsUpdates);
  const clearAllTransactions = useTransactionStore(state => state.clearAllTransactions);

  const router = useRouter();

  const handleRefresh = async() => {
    if(vaneClient){
        const txUpdates = await vaneClient?.fetchPendingTxUpdates() || [];
      
        //TODO!! update newer updates with existing ones
        if(txUpdates.length === 0){
            clearAllTransactions();
        }else{
            sortTransactionsUpdates(txUpdates);
            console.log("recv ");
            console.log(recvTransactions);
        }
        
    }else{
        initializeWebSocket();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-slate-900">Pending Transactions</h2>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <button
                onClick={handleRefresh}
                className="p-2 flex items-center gap-2 rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Refresh page"
            >
                Refresh
                <RefreshCw className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
            {recvTransactions.map(tx => (
                <PendingTransactionCard key={tx.txNonce} tx={tx} />
            ))}
        </div>
      </div>
    </div>
  );
}