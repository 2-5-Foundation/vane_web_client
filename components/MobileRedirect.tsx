"use client";

import { useEffect, useState } from 'react';
import { StoreIcon, PlayIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function MobileRedirect() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6 z-50">
      <Card className="max-w-md w-full bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Download Our Mobile App</h2>
            <p className="text-slate-600">
              For the best mobile experience, please download our dedicated mobile application.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <StoreIcon className="w-5 h-5" />
              <span>Download on App Store</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <PlayIcon className="w-5 h-5" />
              <span>Get it on Play Store</span>
            </a>
          </div>

          <p className="text-xs text-slate-500">
            Our mobile app offers enhanced security features and a better experience for managing your digital assets.
          </p>
        </div>
      </Card>
    </div>
  );
}