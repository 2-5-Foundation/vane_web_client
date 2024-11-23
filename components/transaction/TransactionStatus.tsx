"use client";

import { useState, useEffect } from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TransactionStatus() {
  const [status, setStatus] = useState<'pending' | 'receiver_confirmed' | 'completed'>('pending');

  // In a real app, this would be replaced with a websocket or polling mechanism
  // to check for receiver confirmation from the backend
  useEffect(() => {
    // Simulating backend updates without user interaction
    const checkReceiverConfirmation = () => {
      // This would typically be an API call to check status
      if (status === 'pending') {
        setStatus('receiver_confirmed');
      }
    };

    // Check for confirmation after a delay (in real app, this would be websocket/polling)
    // const timer = setTimeout(checkReceiverConfirmation, 3000);
    // return () => clearTimeout(timer);
  }, []);

  const handleSenderConfirm = () => {
    setStatus('completed');
    // Here you would trigger the actual blockchain transaction
  };

  const getStatusDisplay = () => {
    switch (status) {
      case 'pending':
        return {
          icon: <Clock className="w-4 h-4 text-amber-600" />,
          bgColor: 'bg-amber-50',
          text: 'Awaiting Receiver Confirmation',
          badge: <Badge variant="outline" className="text-amber-600 bg-amber-50">Pending</Badge>
        };
      case 'receiver_confirmed':
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

  return (
    <Card className="mt-4 shadow-sm border-slate-100">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full ${statusInfo.bgColor} flex items-center justify-center`}>
              {statusInfo.icon}
            </div>
            <div className="flex items-center gap-2 ml-3">
              <h3 className="text-sm font-medium">Outgoing Transfer</h3>
              <Badge variant="secondary" className="text-xs">Ethereum</Badge>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pl-11">
            <div>
              <p className="text-xs text-slate-500 mb-1">To Address</p>
              <p className="text-sm font-medium font-mono">0x7834...2951</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Codeword</p>
              <p className="text-sm font-medium">BlueHorizon</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Amount</p>
              <p className="text-sm font-medium">2.5 ETH</p>
            </div>
          </div>

          <div className="pl-11 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">{statusInfo.text}</span>
              {statusInfo.badge}
            </div>
            <div className="space-x-2">
              {status === 'receiver_confirmed' && (
                <Button 
                  onClick={handleSenderConfirm}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Confirm & Send
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}