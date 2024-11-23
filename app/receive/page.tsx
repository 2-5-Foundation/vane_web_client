"use client";

import { useState } from 'react';
import { 
  Wallet, 
  ChevronDown, 
  Copy, 
  CheckCircle, 
  QrCode,
  Plus,
  ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ReceivePage() {
  const [selectedToken, setSelectedToken] = useState('ETH');
  const [selectedWallet, setSelectedWallet] = useState('Metamask');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const wallets = [
    { 
      name: 'Metamask', 
      address: '0x7834...2951', 
      connected: true,
      icon: '/metamask.svg'
    },
    { 
      name: 'Phantom', 
      address: '0x9472...1836', 
      connected: true,
      icon: '/phantom.svg'
    }
  ];

  const tokens = [
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      balance: '2.5',
      price: '$4,256.82',
      icon: '/eth.svg'
    },
    { 
      symbol: 'USDT', 
      name: 'Tether', 
      balance: '1,250.00',
      price: '$1.00',
      icon: '/usdt.svg'
    },
    { 
      symbol: 'USDC', 
      name: 'USD Coin', 
      balance: '750.00',
      price: '$1.00',
      icon: '/usdc.svg'
    }
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(wallets.find(w => w.name === selectedWallet)?.address || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">Receive Crypto</h1>
          <p className="text-slate-500 mt-2">Select a token and wallet to receive funds</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          {/* Token Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Select Token
            </label>
            <div className="grid grid-cols-3 gap-4">
              {tokens.map(token => (
                <button
                  key={token.symbol}
                  onClick={() => setSelectedToken(token.symbol)}
                  className={`relative flex items-center p-4 rounded-xl border transition-all duration-200 ${
                    selectedToken === token.symbol
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={token.icon}
                      alt={token.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-medium text-slate-900">{token.symbol}</div>
                      <div className="text-sm text-slate-500">Balance: {token.balance}</div>
                      <div className="text-xs text-slate-400">{token.price}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Wallet Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Select Wallet
            </label>
            <div className="grid grid-cols-2 gap-4">
              {wallets.map(wallet => (
                <button
                  key={wallet.name}
                  onClick={() => setSelectedWallet(wallet.name)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                    selectedWallet === wallet.name
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={wallet.icon}
                      alt={wallet.name}
                      width={24}
                      height={24}
                    />
                    <span className="font-medium text-slate-900">{wallet.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-slate-500">Connected</span>
                  </div>
                </button>
              ))}
              <button className="flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Connect New Wallet</span>
              </button>
            </div>
          </div>

          {/* Address Display */}
          <div className="bg-slate-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-medium text-slate-900">Receiving Address</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Send only {selectedToken} to this address
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 hover:text-slate-700 hover:border-slate-300 transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  {showQR ? 'Hide' : 'Show'} QR
                </button>
                <motion.button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-sm text-blue-600 hover:bg-blue-100 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <><CheckCircle className="w-4 h-4" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy Address</>
                  )}
                </motion.button>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="font-mono text-lg text-slate-900 bg-white rounded-lg border border-slate-200 p-4">
                  {wallets.find(w => w.name === selectedWallet)?.address}
                </div>
              </div>
              {showQR && (
                <div className="w-32 h-32 bg-white rounded-lg border border-slate-200 p-2">
                  <Image
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=112x112&data=${wallets.find(w => w.name === selectedWallet)?.address}`}
                    alt="QR Code"
                    width={112}
                    height={112}
                  />
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <ExternalLink className="w-3 h-3" />
              View on Explorer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}