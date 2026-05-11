// app\admin\dashboard\FormMessage.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function FormMessageContent() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success) {
      setMessage({ type: 'success', text: getSuccessMessage(success) });
      setVisible(true);
    } else if (error) {
      setMessage({ type: 'error', text: error });
      setVisible(true);
    }

    if (success || error) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  function getSuccessMessage(type: string) {
    const messages: Record<string, string> = {
      created: '✅ Project created successfully!',
      updated: '✅ Project updated successfully!',
      deleted: '✅ Project deleted successfully!',
    };
    return messages[type] || '✅ Operation completed successfully!';
  }

  if (!visible || !message) return null;

  return (
    <div className="mb-6 animate-fade-up">
      <div className={`rounded-lg border px-4 py-3 ${
        message.type === 'success' 
          ? 'border-mint/30 bg-mint/10 text-mint' 
          : 'border-red-400/30 bg-red-400/10 text-red-400'
      }`}>
        <p className="text-sm font-medium">{message.text}</p>
      </div>
    </div>
  );
}

export default function FormMessage() {
  return (
    <Suspense fallback={null}>
      <FormMessageContent />
    </Suspense>
  );
}