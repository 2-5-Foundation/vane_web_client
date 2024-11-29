"use client";

import { Bell, ExternalLink } from 'lucide-react';
import { TxStateMachine } from 'vane_lib';
import { useTransactionStore } from '@/lib/useStore';
import { shortenAddress } from '@/lib/utils';
import { useWalletStore } from '@/lib/useStore';
import { TxStateMachineManager } from 'vane_lib';
import { hexToBytes, bytesToHex } from 'viem';

interface PendingTransactionCardProps {
  tx: TxStateMachine;
}


export default function PendingTransactionCard({ tx }: PendingTransactionCardProps) {
    const vaneClient = useTransactionStore(state => state.vaneClient);
    const removeRecvTransaction = useTransactionStore(state => state.removeRecvTransaction);
    const wallets = useWalletStore(state => state.wallets);
    const activeWallet = wallets[0];

    const approve = async () => {
        
        try {
        // TODO make the app directly select which active wallet to use
        // sign and submit
        const signedTx = await activeWallet.eth_client.signMessage({
            //@ts-ignore
            account: tx.receiverAddress,
            message: tx.receiverAddress
        })
        const txManager = new TxStateMachineManager(tx);
        txManager.setReceiverSignature(hexToBytes(signedTx));
        const updatedTx = txManager.getTx();
        console.log(updatedTx);
          
        await vaneClient?.receiverConfirm(
            updatedTx
        );
        // remove the tx update from recvTransaction
        removeRecvTransaction(tx.txNonce);

        } catch (error) {
          // Handle errors appropriately
          console.error('recv Transaction failed:', error);
          // You might want to show this error to the user via a toast or alert
        }
    }

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
            <span className="text-xs text-slate-500">2</span>
            <button className="text-slate-400 hover:text-slate-600">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">From Address</p>
            {/* @ts-ignore */}
            <p className="text-sm font-medium text-slate-900 font-mono">{shortenAddress(tx.receiver_address)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Codeword</p>
            <p className="text-sm font-medium text-slate-900">BuzzFeed</p>
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
          <button
            onClick={approve}
            className="px-4 py-2 rounded-md bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-medium hover:from-emerald-600 hover:to-blue-600 transition-all shadow-sm"
           >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}