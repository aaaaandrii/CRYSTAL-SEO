import Link from 'next/link';
import { pages } from '@/lib/content-types';

export default function AdminPagesPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-white">Pages</h1>
        <p className="mt-1 text-sm text-brand-gray">
          Select a page to edit its blocks and content.
        </p>
      </div>

      <div className="space-y-3">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/admin/pages/${page.id}`}
            className="group flex items-center justify-between rounded-lg border border-brand-border/50 bg-brand-navy p-6 transition-all hover:border-brand-accent/50"
          >
            <div>
              <h2 className="text-lg font-semibold text-brand-white group-hover:text-brand-accent transition-colors">
                {page.label}
              </h2>
              <p className="mt-1 text-sm text-brand-gray/70">{page.description}</p>
              <p className="mt-2 text-xs text-brand-gray/40">
                {page.blocks.length} block{page.blocks.length !== 1 ? 's' : ''}
              </p>
            </div>
            <span className="text-sm text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Edit Blocks →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
