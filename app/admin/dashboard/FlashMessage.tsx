// app\admin\dashboard\FlashMessage.tsx
'use client';

import { useEffect, useState } from 'react';

interface FlashMessageProps {
  flashMessage: {
    type: 'success' | 'error';
    message: string;
  } | null;
}

export default function FlashMessage({ flashMessage }: FlashMessageProps) {
  const [visible, setVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (flashMessage) {
      // Show message with animation
      setVisible(true);
      setIsExiting(false);

      // Start exit animation after 4 seconds
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 4000);

      // Remove from DOM after exit animation
      const removeTimer = setTimeout(() => {
        setVisible(false);
      }, 4500);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [flashMessage]);

  if (!visible || !flashMessage) return null;

  return (
    <div className={`fixed right-6 top-24 z-50 transition-all duration-500 ${
      isExiting 
        ? 'translate-x-full opacity-0' 
        : 'translate-x-0 opacity-100'
    }`}>
      <div className={`glass-strong flex items-center gap-3 rounded-lg px-4 py-3 shadow-2xl min-w-[300px] ${
        flashMessage.type === 'success' 
          ? 'border-mint/30' 
          : 'border-red-400/30'
      }`}>
        {/* Icon */}
        <div className={`shrink-0 rounded-full p-1 ${
          flashMessage.type === 'success' 
            ? 'bg-mint/20 text-mint' 
            : 'bg-red-400/20 text-red-400'
        }`}>
          {flashMessage.type === 'success' ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        {/* Message */}
        <p className="flex-1 text-sm font-medium text-pearl">
          {flashMessage.message}
        </p>

        {/* Close button */}
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(() => setVisible(false), 500);
          }}
          className="shrink-0 rounded-md p-0.5 text-pearl/40 transition-colors hover:text-pearl"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-lg">
          <div 
            className={`h-full animate-[shrink_4s_linear] ${
              flashMessage.type === 'success' ? 'bg-mint' : 'bg-red-400'
            }`}
            style={{
              animation: 'shrink 4s linear forwards'
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}