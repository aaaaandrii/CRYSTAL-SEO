import Link from 'next/link';
import { contentTypes } from '@/lib/content-types';

export default function AdminListsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-white">List Content</h1>
        <p className="mt-1 text-sm text-brand-gray">
          Manage repeating content items like FAQs, benefits, sectors, and more.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.values(contentTypes).map((ct) => (
          <Link
            key={ct.type}
            href={`/admin/lists/${ct.type}`}
            className="group rounded-lg border border-brand-border bg-brand-navy p-5 transition-colors hover:border-brand-accent/50"
          >
            <h3 className="text-sm font-semibold text-brand-white group-hover:text-brand-accent transition-colors">
              {ct.labelPlural}
            </h3>
            <p className="mt-1 text-xs text-brand-gray">{ct.description}</p>
            <p className="mt-3 text-xs text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">
              Manage →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
