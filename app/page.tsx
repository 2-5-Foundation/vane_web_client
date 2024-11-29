"use client"

import Dashboard from '@/components/dashboard/Dashboard';
import Navbar from '@/components/layout/Navbar';
import TransactionForm from '@/components/transaction/TransactionForm';
import TransactionStatus from '@/components/transaction/TransactionStatus';
import { useInitializeWebSocket } from '@/lib/useStore';
import { useTransactionStore } from '@/lib/useStore';
import dynamic from 'next/dynamic';

const WalletList = dynamic(
    () => import('@/components/wallet/WalletList'),  // Adjust path based on your file structure
    { ssr: false }
);

export default function Home() {
  const wsUrl = useTransactionStore(state => state.wsUrl);
  console.log("in the home page");
  console.log(wsUrl);
  
  useInitializeWebSocket();  

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <WalletList />
            </div>
            
            <div className="col-span-2">
            <TransactionForm />
          <TransactionStatus />
        </div>
      </div>
     </div>
    </>
  );
}