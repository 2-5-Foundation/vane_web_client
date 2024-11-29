"use client"

import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import PageHeader  from '@/components/ui/PageHeader';
import { SettingsToggle } from '@/components/settings/SettingsToggle';
import { AdvancedSettings } from './AdvancedSettings';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { useTransactionStore } from '@/lib/useStore';

export default function SettingsPage() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const setWsUrl = useTransactionStore(state => state.setWsUrl);

  const [connectionUrl, setConnectionUrl] = useState('');
  const [walletAddress, setWalletAddress] = useState('');

  const updateWsUrl = () => {
    setWsUrl(connectionUrl);
    localStorage.setItem('connectionUrl', connectionUrl);
  };

  const handleChangeWsUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setConnectionUrl(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 transition-colors duration-300">
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <PageHeader
            icon={<Settings className="w-6 h-6 text-primary" />}
            title="Settings"
            description="Manage your application settings and configurations."
          />
          <ThemeToggle />
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-card to-card/95 border-primary/10 shadow-md">
            <h2 className="text-lg font-medium mb-4 text-foreground">General Settings</h2>
            <p className="text-sm text-muted-foreground">
              No general settings are available at the moment.
            </p>
          </Card>

          <SettingsToggle
            checked={showAdvanced}
            onCheckedChange={setShowAdvanced}
            label="Show Advanced Settings"
          />

          {showAdvanced && (
            <AdvancedSettings
              connectionUrl={connectionUrl}
              walletAddress={walletAddress}
              onConnectionUrlChange={handleChangeWsUrl}
              onWalletAddressChange={setWalletAddress}
              onSave={updateWsUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}