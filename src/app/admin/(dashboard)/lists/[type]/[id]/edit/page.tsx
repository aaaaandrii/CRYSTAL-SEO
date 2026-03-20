'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { contentTypes } from '@/lib/content-types';
import type { FieldDef } from '@/lib/content-types';

export default function EditItemPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ type: string; id: string } | null>(null);
  const [data, setData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (!resolvedParams) return;
    fetch(`/api/items/${resolvedParams.id}`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((item) => {
        if (item?.data) setData(item.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams]);

  const typeDef = resolvedParams ? contentTypes[resolvedParams.type] : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!resolvedParams) return;
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch(`/api/items/${resolvedParams.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });

      if (res.ok) {
        setMessage('Saved successfully');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const body = await res.json();
        setMessage(body.error || 'Failed to save');
      }
    } catch {
      setMessage('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-brand-gray">Loading...</p>;
  }

  if (!typeDef || !resolvedParams) {
    return (
      <div>
        <p className="text-brand-gray">Item not found.</p>
        <Link href="/admin/lists" className="mt-4 inline-block text-sm text-brand-accent hover:underline">
          ← Back to Lists
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href={`/admin/lists/${resolvedParams.type}`}
          className="text-sm text-brand-gray hover:text-brand-accent transition-colors"
        >
          ← Back to {typeDef.labelPlural}
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-white">
          Edit {typeDef.label}
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

        <div className="mt-6 flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2.5 px-6 rounded-md transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.push(`/admin/lists/${resolvedParams.type}`)}
            className="text-sm text-brand-gray hover:text-brand-white transition-colors"
          >
            Cancel
          </button>
          {message && (
            <span className={`text-sm ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
              {message}
            </span>
          )}
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
