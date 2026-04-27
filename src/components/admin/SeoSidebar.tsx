'use client';

import { useMemo, useState } from 'react';
import {
  runSeoChecks,
  scoreFromChecks,
  type CheckStatus,
} from '@/lib/seo-checks';

interface SeoSidebarProps {
  title: string;
  excerpt: string;
  content: string;
  imageAlt?: string;
}

const dotColor: Record<CheckStatus, string> = {
  good: 'bg-green-400',
  ok: 'bg-yellow-400',
  bad: 'bg-red-400',
  neutral: 'bg-brand-gray/40',
};

function scoreColor(score: number): string {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 30) return 'text-orange-400';
  return 'text-red-400';
}

export function SeoSidebar({
  title,
  excerpt,
  content,
  imageAlt = '',
}: SeoSidebarProps) {
  const [keyphrase, setKeyphrase] = useState('');

  const checks = useMemo(
    () => runSeoChecks({ title, excerpt, content, imageAlt, keyphrase }),
    [title, excerpt, content, imageAlt, keyphrase]
  );

  const { score, label } = useMemo(() => scoreFromChecks(checks), [checks]);

  return (
    <aside className="bg-brand-navy border border-brand-border rounded-lg p-5 lg:sticky lg:top-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-gray">
        SEO Analysis
      </h2>

      <div className="mt-4">
        <label className="block text-xs font-medium text-brand-gray mb-1.5">
          Focus keyphrase
        </label>
        <input
          type="text"
          value={keyphrase}
          onChange={(e) => setKeyphrase(e.target.value)}
          placeholder="e.g. eternal data storage"
          className="admin-input"
        />
        <p className="mt-1 text-[11px] text-brand-gray/70">
          Optional. Adds keyphrase-specific checks below.
        </p>
      </div>

      <div className="mt-5 flex items-baseline gap-2 pb-4 border-b border-brand-border">
        <span className={`text-3xl font-bold ${scoreColor(score)}`}>
          {score}
        </span>
        <span className="text-sm text-brand-gray">/ 100 — {label}</span>
      </div>

      <ul className="mt-4 space-y-3">
        {checks.map((c) => (
          <li key={c.id} className="flex items-start gap-2.5">
            <span
              className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${dotColor[c.status]}`}
              aria-label={c.status}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-brand-white">
                {c.label}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-brand-gray">
                {c.message}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
