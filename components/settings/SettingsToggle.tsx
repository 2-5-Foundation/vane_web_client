import { Switch } from '@/components/ui/switch';

interface SettingsToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}

export function SettingsToggle({ checked, onCheckedChange, label }: SettingsToggleProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-primary"
      />
      <label className="text-sm font-medium cursor-pointer select-none">
        {label}
      </label>
    </div>
  );
}