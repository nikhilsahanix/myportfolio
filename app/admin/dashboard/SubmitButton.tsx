'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-ink hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? 'Saving...' : 'Save Project to Database'}
    </button>
  );
}