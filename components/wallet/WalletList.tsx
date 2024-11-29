"use client";

import { Wallet, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'
import { useWalletStore } from '@/lib/useStore';




export default function WalletList() {
  const addWalletClient = useWalletStore(state => state.addWalletClient);
  const wallets = useWalletStore(state => state.wallets);

  console.log(wallets)

  return (
    <Card className="shadow-sm border-slate-100">
      <div className="p-4 flex items-center justify-between hover:bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Wallet className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Connected Wallets</p>
            <p className="text-xs text-slate-500">
              {wallets.length} {wallets.length === 1 ? 'wallet' : 'wallets'} connected
            </p>
          </div>
        </div>
        
        <Button 
          onClick={addWalletClient}
          variant="ghost"
          size="icon"
          className="h-8 w-8"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </Card>
);
}