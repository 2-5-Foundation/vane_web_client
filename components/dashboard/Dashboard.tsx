"use client";

import { Activity, Shield, DollarSign } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-slate-900">Transaction Overview</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Stats Row */}
        <div className="grid grid-cols-3 gap-6">
          {/* Total Transactions */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Transactions</p>
                <h3 className="text-2xl font-semibold text-slate-900 mt-1">1,212</h3>
                <p className="text-sm text-slate-500 mt-2">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Transaction Volume */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Volume</p>
                <h3 className="text-2xl font-semibold text-slate-900 mt-1">$481,000</h3>
                <p className="text-sm text-slate-500 mt-2">Avg. $396.86 per transaction</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Protected Transactions */}
          <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Protected & Recovered</p>
                  <p className="text-base text-slate-500 mt-1">29 transactions safeguarded</p>
                </div>
              </div>
            </div>
            <div className="mt-2 pt-3 border-t border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-slate-600">Value Protected:</span>
                <span className="text-2xl font-bold text-blue-600">$12,450</span>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-slate-500">Average Recovery:</span>
                <span className="font-medium text-blue-600">$429.31</span>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span className="text-slate-500">Largest Recovery:</span>
                <span className="font-medium text-blue-600">$2,140</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}