"use client";

import { ReactNode } from 'react';

interface PageHeaderProps {
  icon: ReactNode;
  title: string;
  description?: string;
}

export function PageHeader({ icon, title, description }: PageHeaderProps) {
  return (
    <div className="border-b pb-6 mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-primary/10 p-2 rounded-lg text-primary">
          {icon}
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      </div>
      {description && (
        <p className="text-muted-foreground ml-[52px]">{description}</p>
      )}
    </div>
  );
}

export default PageHeader;