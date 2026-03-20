import Link from 'next/link';
import { pageSections } from '@/lib/content-types';

export default function AdminPagesPage() {
  // Group sections by page
  const grouped = pageSections.reduce<Record<string, typeof pageSections>>((acc, s) => {
    if (!acc[s.page]) acc[s.page] = [];
    acc[s.page].push(s);
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-white">Page Content</h1>
        <p className="mt-1 text-sm text-brand-gray">
          Edit text, headings, and CTAs for each section of the website.
        </p>
      </div>

      {Object.entries(grouped).map(([page, sections]) => (
        <div key={page} className="mb-8">
          <h2 className="mb-4 text-lg font-semibold capitalize text-brand-white">
            {page === 'home' ? 'Homepage' : page}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s) => (
              <Link
                key={`${s.page}-${s.section}`}
                href={`/admin/pages/${s.page}/${s.section}`}
                className="group rounded-lg border border-brand-border bg-brand-navy p-5 transition-colors hover:border-brand-accent/50"
              >
                <h3 className="text-sm font-semibold text-brand-white group-hover:text-brand-accent transition-colors">
                  {s.label}
                </h3>
                <p className="mt-1 text-xs text-brand-gray">{s.description}</p>
                <p className="mt-3 text-xs text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  Edit →
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
