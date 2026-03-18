'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function DeleteButton({
  id,
  endpoint,
  itemName,
}: {
  id: string;
  endpoint: string;
  itemName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${itemName}"?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Failed to delete');
        return;
      }
      router.refresh();
    } catch {
      alert('Failed to delete');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-brand-gray hover:text-red-400 transition-colors text-sm disabled:opacity-50"
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
