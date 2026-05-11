// app\admin\dashboard\DeleteButton.tsx
'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  projectId: string;
  projectTitle: string;
  deleteAction: (formData: FormData) => Promise<void>;
}

export default function DeleteButton({ projectId, projectTitle, deleteAction }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`)) {
      const formData = new FormData();
      formData.set('id', projectId);
      
      startTransition(async () => {
        await deleteAction(formData);
        router.refresh(); // Force instant refresh
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="relative inline-flex items-center justify-center rounded-md p-1.5 text-pearl/30 transition-all hover:text-red-400 hover:bg-red-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
      title="Delete project"
    >
      {isPending ? (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )}
    </button>
  );
}