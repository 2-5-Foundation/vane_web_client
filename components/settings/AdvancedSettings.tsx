"use client"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, Link } from 'lucide-react';

interface AdvancedSettingsProps {
  connectionUrl: string;
  walletAddress: string;
  onConnectionUrlChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onWalletAddressChange: (value: string) => void;
  onSave: () => void;
}

export function AdvancedSettings({
  connectionUrl,
  walletAddress,
  onConnectionUrlChange,
  onWalletAddressChange,
  onSave,
}: AdvancedSettingsProps) {
  return (
    <div className="grid gap-6">
      <Card className="p-6 bg-gradient-to-br from-card to-card/95 border-primary/10">
        <div className="flex items-center gap-2 mb-6">
          <Link className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Connection Settings</h3>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Connection URL</label>
          <Input
            type='text'
            placeholder="ws://localhost:port"
            value={connectionUrl}
            onChange={onConnectionUrlChange}
            className="border-primary/20 bg-background/50"
          />
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-card to-card/95 border-primary/10">
        <div className="flex items-center gap-2 mb-6">
          <Wallet className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-medium">Wallet Configuration</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Wallet Address</label>
            <Input
              type='text'
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => onWalletAddressChange(e.target.value)}
              className="border-primary/20 bg-background/50"
            />
          </div>
          <Button 
            variant="secondary" 
            className="w-full bg-primary/10 hover:bg-primary/20 text-primary"
          >
            Connect Wallet
          </Button>
        </div>
      </Card>

      <Button 
        onClick={onSave}
        className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80"
      >
        Save Changes
      </Button>
    </div>
  );
}