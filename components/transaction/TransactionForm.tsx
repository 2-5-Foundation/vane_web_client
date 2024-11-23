"use client";

import { useState } from 'react';
import { Bell, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TransactionForm() {
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
                type="text"
                placeholder="Enter wallet address"
                className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Amount</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Asset</span>
                <select className="mt-1 w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                  <option>ETH</option>
                  <option>USDT</option>
                  <option>USDC</option>
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

          <button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90">
            Initiate Transaction
          </button>
        </div>
      </CardContent>
    </Card>
  );
}