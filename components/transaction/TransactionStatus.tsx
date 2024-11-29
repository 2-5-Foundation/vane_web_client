"use client";

import { useState, useEffect } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TxStateMachine, TxStateMachineManager,createVaneClient,VaneClientRpc,TxStatus } from "vane_lib";
import { useTransactionStore,useWalletStore} from '@/lib/useStore';
import { shortenAddress } from '@/lib/utils';
import { RefreshCcw } from 'lucide-react';
import { hexToBytes, bytesToHex } from 'viem';


export default function TransactionStatus() {
  const status = useTransactionStore(state => state.status);
  const setStatus = useTransactionStore(state => state.setStatus);
  const clearAllTransactions = useTransactionStore(state => state.clearAllTransactions);
  const sortTransactionsUpdates = useTransactionStore(state => state.sortTransactionsUpdates);
  const initializeWebSocket = useTransactionStore(state => state.initializeWebSocket);
  const recvTransactions = useTransactionStore(state => state.recvTransactions);
  const vaneClient = useTransactionStore(state => state.vaneClient);
  const formData = useTransactionStore().formData;
  const wallets = useWalletStore(state => state.wallets);
  const activeWallet = wallets[0];
  // ----------------------------------------------------------------------------- //

  const {transactions} = useTransactionStore();
  const latest_tx = transactions[0];

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
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


  // --------------- ** color and progress for tx status ** -----------------------//
  const getTxStatusColor = (status: TxStatus) => {
    switch (status.type) {
      // Initial State
      case "Genesis":
        return "text-gray-500 bg-gray-100"; // Neutral gray
  
      // Processing States
      case "RecvAddrConfirmed":
        return "text-blue-500 bg-blue-50"; // Processing blue
  
      case "RecvAddrConfirmationPassed":
        return "text-indigo-500 bg-indigo-50"; // Progress indigo
  
      case "NetConfirmed":
        return "text-purple-500 bg-purple-50"; // Progress purple
  
      case "SenderConfirmed":
        return "text-emerald-500 bg-emerald-50"; // Near completion green
  
      // Success State
      case "TxSubmissionPassed":
        return "text-green-500 bg-green-50"; // Success green
  
      // Error/Failure States
      case "SenderConfirmationfailed":
        return "text-orange-500 bg-orange-50"; // Warning orange
  
      case "RecvAddrFailed":
        return "text-red-500 bg-red-50"; // Error red
  
      case "FailedToSubmitTxn":
        return "text-red-600 bg-red-50"; // Critical error darker red
  
      default:
        return "text-gray-500 bg-gray-100"; // Default fallback
    }
  }
  // ----------------------------------------------------------------------------- //
  
  useEffect(() => {
    const checkTxStatus = () => {
      switch (latest_tx?.status) {
        //@ts-ignore
        case "Genesis":
          setStatus('pending');
          break;
          // @ts-ignore
        case "ReceiverNotRegistered":
          console.log("here recv not reg");
          setStatus('receiverNotRegistered');
          break;
        // @ts-ignore
        case "RecvAddrFailed":
          setStatus('RecvAddrFailed');
          break;
        // ... handle other cases as needed
      }
    };
    checkTxStatus();
    console.log(latest_tx);
  }, [transactions]);

  const handleSenderConfirm = async() => {
    try {
      // TODO make the app directly select which active wallet to use
      // sign and submit
      if (!latest_tx.callPayload) {
        throw new Error('Call payload is undefined');
      }

      const signedTx = await activeWallet.eth_client.signMessage({
        //@ts-ignore
        account: latest_tx.senderAddress,
        message: bytesToHex(latest_tx.callPayload)   
      })
      const txManager = new TxStateMachineManager(latest_tx);
      txManager.setReceiverSignature(hexToBytes(signedTx));
      const updatedTx = txManager.getTx();
      console.log(updatedTx);
        
      await vaneClient?.receiverConfirm(
          updatedTx
      );
      // remove the tx update from recvTransaction
      setStatus('completed');      
      } catch (error) {
        // Handle errors appropriately
        console.error('recv Transaction failed:', error);
        // You might want to show this error to the user via a toast or alert
    }
    setStatus('initial');
  };

  const handleCancel = () => {
    setStatus('initial');
  };

  console.log(status);

  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="w-4 h-4 text-amber-600"/>,
          bgColor: 'bg-amber-50',
          text: 'Awaiting Receiver Confirmation',
          badge: <Badge variant="outline" className="text-amber-600 bg-amber-50">Pending</Badge>
        };
      case 'receiverNotRegistered':
        return {
          icon: <AlertCircle className="w-4 h-4 text-amber-500 bg-amber-50" />,
          bgColor: 'bg-red-50',
          text: 'Status',
          badge: <Badge variant="outline" className="text-amber-500 bg-amber-50">Receiver Not Registered</Badge>
        };
      case 'RecvAddrFailed':
        return {
          icon: <AlertCircle className="w-4 h-4 text-red-500 bg-red-50" />,
          bgColor: 'bg-amber-50',
          text: 'Receiver Failed to Confirm',
          badge: <Badge variant="outline" className="text-red-500 bg-red-50">Wrong Receiver Address</Badge>
        };
      case 'receiverConfirmed':
        return {
          icon: <AlertCircle className="w-4 h-4 text-blue-600" />,
          bgColor: 'bg-blue-50',
          text: 'Receiver Confirmed - Waiting for Your Confirmation',
          badge: <Badge variant="outline" className="text-blue-600 bg-blue-50">Ready to Send</Badge>
        };
      case 'completed':
        return {
          icon: <Check className="w-4 h-4 text-emerald-600" />,
          bgColor: 'bg-emerald-50',
          text: 'Transaction Completed',
          badge: <Badge variant="outline" className="text-emerald-600 bg-emerald-50">Completed</Badge>
        };
    }
  };


  const statusInfo = getStatusDisplay();

  // Only render if we have all required props
  if (!statusInfo) {
    return null;
  }


  const getButtonConfig = (status: string) => {
    switch (status) {
      case 'receiverConfirmed':
        return {
          text: 'Confirm & Send',
          onClick: handleSenderConfirm,
          disabled: false,
          show: true,
          className: "m-2 min-w-[160px] w-[200px] px-8 py-2.5 font-medium text-white bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg hover:opacity-90 transition-all"
        };
      case 'receiverNotRegistered':
        return {
          text: 'Cancel',
          onClick: handleCancel,
          disabled: false,
          show: true,
          className: "min-w-[160px] w-[200px] px-8 py-2.5 font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all"
        };
      case 'pending':
        return {
          text: 'Processing...',
          onClick: undefined,
          show: true,
          disabled: true,
          className: "m-2 min-w-[160px] w-[200px] px-8 py-2.5 font-medium text-white bg-slate-400 rounded-lg cursor-not-allowed opacity-75"
        };
      default:
        return { show: false };
    }
};


return (
  <Card className="mt-4 shadow-sm border-slate-100">
    <CardContent className="p-4 relative">
    <div className="absolute top-2 right-5">
    <Button 
      onClick={handleRefresh}
      className="flex items-center gap-2 px-3 py-2 hover:bg-slate-100 text-slate-600 hover:text-slate-900"
      variant="ghost"
      size="sm"
      disabled={isRefreshing}
    >
      <span className="text-sm font-medium">Refresh</span>
      <RefreshCcw 
        className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`}
      />
    </Button>
    </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full ${statusInfo?.bgColor} flex items-center justify-center`}>
            {statusInfo?.icon}
          </div>
          <div className="flex items-center gap-2 ml-3">
            <h3 className="text-sm font-medium">Outgoing Transfer</h3>
            <Badge variant="secondary" className="text-xs">
              {latest_tx?.network || formData.network}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pl-11">
          <div>
            <p className="text-xs text-slate-500 mb-1">To Address</p>
            <p className="text-sm font-medium font-mono">
              {shortenAddress(latest_tx?.receiverAddress || formData.recipient)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Codeword</p>
            <p className="text-sm font-medium">BlueHorizon</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Amount</p>
            <p className="text-sm font-medium">{latest_tx?.amount || formData.amount} ETH</p>
          </div>
        </div>
        
        <div className="pl-11 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">{statusInfo?.text}</span>
            {statusInfo?.badge}
          </div>
          <div>
            {getButtonConfig(status).show && (
              <Button 
                onClick={getButtonConfig(status).onClick}
                disabled={getButtonConfig(status).disabled}
                className={getButtonConfig(status).className}
              >
                {getButtonConfig(status).text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
 );
}