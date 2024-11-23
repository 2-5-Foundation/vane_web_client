"use client";

import { Wallet, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DEMO_WALLETS = [
  {
    id: '1',
    name: 'Metamask',
    connected: true,
  },
  {
    id: '2',
    name: 'Phantom',
    connected: true,
  }
];

export default function WalletList() {
  return (
    <Card className="shadow-sm border-slate-100">
      <CardHeader className="border-b border-slate-100">
        <CardTitle className="text-base font-medium">Connected Wallets</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {DEMO_WALLETS.map(wallet => (
            <div key={wallet.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{wallet.name}</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
          ))}
          
          <button 
            className="w-full p-4 flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Plus className="w-4 h-4" />
            Connect New Wallet
          </button>
        </div>
      </CardContent>
    </Card>
  );
}