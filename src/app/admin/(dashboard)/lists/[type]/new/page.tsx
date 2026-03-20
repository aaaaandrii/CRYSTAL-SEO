'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { contentTypes } from '@/lib/content-types';
import type { FieldDef } from '@/lib/content-types';

export default function NewItemPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const router = useRouter();
  const [type, setType] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    params.then((p) => setType(p.type));
  }, [params]);

  const typeDef = type ? contentTypes[type] : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!type) return;
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data }),
      });

      if (res.ok) {
        router.push(`/admin/lists/${type}`);
      } else {
        const body = await res.json();
        setError(body.error || 'Failed to create');
      }
    } catch {
      setError('Failed to create');
    } finally {
      setSaving(false);
    }
  }

  if (!typeDef) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href={`/admin/lists/${type}`}
          className="text-sm text-brand-gray hover:text-brand-accent transition-colors"
        >
          ← Back to {typeDef.labelPlural}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-white">
          New {typeDef.label}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="space-y-5 rounded-lg border border-brand-border bg-brand-navy p-6">
          {typeDef.fields.map((field) => (
            <FieldInput
              key={field.key}
              field={field}
              value={data[field.key] ?? (field.type === 'boolean' ? false : '')}
              onChange={(val) => setData({ ...data, [field.key]: val })}
            />
          ))}
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2.5 px-6 rounded-md transition-colors disabled:opacity-50"
          >
            {saving ? 'Creating...' : `Create ${typeDef.label}`}
          </button>
          <Link
            href={`/admin/lists/${type}`}
            className="text-sm text-brand-gray hover:text-brand-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  const baseClass =
    'w-full rounded-md border border-brand-border bg-brand-dark px-3 py-2 text-sm text-brand-white placeholder-brand-gray/50 focus:border-brand-accent focus:outline-none';

  if (field.type === 'boolean') {
    return (
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded bg-brand-dark border-brand-border text-brand-accent"
        />
        <label className="text-sm font-medium text-brand-gray">{field.label}</label>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-gray">
        {field.label}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={baseClass}
        />
      ) : field.type === 'select' ? (
        <select
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        >
          <option value="">Select...</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === 'number' ? (
        <input
          type="number"
          value={value !== '' && value !== undefined ? Number(value) : ''}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
          placeholder={field.placeholder}
          className={baseClass}
        />
      ) : (
        <input
          type="text"
          value={String(value ?? '')}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
