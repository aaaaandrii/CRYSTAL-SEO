'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { pageSections } from '@/lib/content-types';
import type { FieldDef } from '@/lib/content-types';

export default function EditSectionPage({
  params,
}: {
  params: Promise<{ page: string; section: string }>;
}) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ page: string; section: string } | null>(null);
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  const sectionDef = resolvedParams
    ? pageSections.find((s) => s.page === resolvedParams.page && s.section === resolvedParams.section)
    : null;

  useEffect(() => {
    if (!resolvedParams) return;
    fetch(`/api/content/${resolvedParams.page}/${resolvedParams.section}`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.content) setContent(data.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [resolvedParams]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!resolvedParams) return;
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch(`/api/content/${resolvedParams.page}/${resolvedParams.section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        setMessage('Saved successfully');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await res.json();
        setMessage(data.error || 'Failed to save');
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

  if (!sectionDef) {
    return (
      <div>
        <p className="text-brand-gray">Section not found.</p>
        <Link href="/admin/pages" className="mt-4 inline-block text-sm text-brand-accent hover:underline">
          ← Back to Pages
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/pages" className="text-sm text-brand-gray hover:text-brand-accent transition-colors">
          ← Back to Pages
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-white">{sectionDef.label}</h1>
        <p className="mt-1 text-sm text-brand-gray">{sectionDef.description}</p>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl">
        <div className="space-y-5 rounded-lg border border-brand-border bg-brand-navy p-6">
          {sectionDef.fields.map((field) => (
            <FieldInput
              key={field.key}
              field={field}
              value={content[field.key] ?? ''}
              onChange={(val) => setContent({ ...content, [field.key]: val })}
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
  value: string;
  onChange: (val: string) => void;
}) {
  const baseClass =
    'w-full rounded-md border border-brand-border bg-brand-dark px-3 py-2 text-sm text-brand-white placeholder-brand-gray/50 focus:border-brand-accent focus:outline-none';

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-brand-gray">
        {field.label}
      </label>
      {field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={baseClass}
        />
      ) : field.type === 'select' ? (
        <select
          value={value}
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
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={baseClass}
        />
      )}
    </div>
  );
}
