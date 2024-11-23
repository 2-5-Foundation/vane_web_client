import Dashboard from '@/components/dashboard/Dashboard';
import Navbar from '@/components/layout/Navbar';
import TransactionForm from '@/components/transaction/TransactionForm';
import TransactionStatus from '@/components/transaction/TransactionStatus';
import WalletList from '@/components/wallet/WalletList';

export default function Home() {
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