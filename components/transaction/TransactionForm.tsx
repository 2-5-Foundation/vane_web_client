"use client";

import { useState } from 'react';
import { Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TxStateMachine, TxStateMachineManager,createVaneClient,VaneClientRpc } from "vane_lib";
import { useTransactionStore,useWalletStore} from '@/lib/useStore';

export default function TransactionForm() {
  const setStatus = useTransactionStore().setStatus;
  const storeSetFormData = useTransactionStore().storeSetFormData;
  const wallets = useWalletStore(state => state.wallets);
  const activeWallet = wallets[0];
  const {vaneClient} = useTransactionStore();
  // --------------- **           ** --------------------//
  interface FormData {
    recipient: string;
    amount: number; 
    asset: string;
    network: string;
  }

  const [formData, setFormData] = useState<FormData>({
    recipient: '',
    amount: 0,
    asset: 'Eth',
    network: 'Ethereum'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? Number(value) : value
    }));

   if (formData.amount > 0 && formData.recipient.trim() !== '') {
    console.log(formData);
    storeSetFormData(formData);
   }

  };

  // it must automatically resolve which wallet to use and network per address
  const chooseWallet = async() => {

  }


  const submitInitiateTx = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!formData.recipient || !formData.amount) {
        throw new Error('Please fill in all required fields');
      }
      
      await vaneClient?.initiateTransaction(
        activeWallet.address,
        formData.recipient,
        formData.amount,
        formData.asset,
        formData.network
      );
      
      setStatus('pending');
      
    } catch (error) {
      // Handle errors appropriately
      console.error('Transaction failed:', error);
      // You might want to show this error to the user via a toast or alert
    }
  };
  

  // In a real app, this would come from your wallet/API
  const userBalance = {
    amount: 5280.42,
    previousAmount: 5150.30,
    currency: 'USD'
  };

  const priceChange = userBalance.amount - userBalance.previousAmount;
  const percentageChange = (priceChange / userBalance.previousAmount) * 100;
  const isPositive = priceChange > 0;

  return (
    <Card className="shadow-sm border-slate-100">
      <CardHeader className="border-b border-slate-100 bg-gradient-to-b from-white to-slate-50/50">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm text-slate-500 font-medium">Total Balance</p>
          <p className="text-4xl font-bold mt-1 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            ${userBalance.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className={`flex items-center gap-1 mt-2 ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {isPositive ? '+' : ''}{percentageChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Recipient</span>
              <input
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                type="text"
                placeholder="Enter wallet address"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Amount</span>
                <input
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  type="text"
                  placeholder="0.00"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Asset</span>
                <select
                  name="asset"
                  value={formData.asset}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                   <option value="ETH">ETH</option>
                   <option value="USDT">USDT</option>
                <option value="USDC">USDC</option>
                </select>
              </label>
            </div>
          </div>

          <Alert className="bg-blue-50 border-blue-100">
            <AlertDescription className="flex items-center gap-2 text-blue-600">
              <Bell className="w-4 h-4" />
              Recipient will need to confirm the transaction
            </AlertDescription>
          </Alert>

          <button 
            onClick={submitInitiateTx}
            className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
            >
            Initiate Transaction
          </button>
        </div>
      </CardContent>
    </Card>
  );
}