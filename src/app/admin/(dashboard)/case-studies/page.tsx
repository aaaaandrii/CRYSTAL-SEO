import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { DeleteButton } from '@/components/admin/DeleteButton';

interface CaseStudyListItem {
  id: string;
  title: string;
  slug: string;
  client: string;
  sector: string;
  published: boolean;
  featured: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

export default async function AdminCaseStudiesPage() {
  const caseStudies: CaseStudyListItem[] = await prisma.caseStudy.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      client: true,
      sector: true,
      published: true,
      featured: true,
      publishedAt: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-brand-white">Case Studies</h1>
        <Link
          href="/admin/case-studies/new"
          className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Create New
        </Link>
      </div>

      {caseStudies.length === 0 ? (
        <div className="bg-brand-navy border border-brand-border rounded-lg p-12 text-center">
          <p className="text-brand-gray mb-4">No case studies yet.</p>
          <Link
            href="/admin/case-studies/new"
            className="text-brand-accent hover:underline text-sm"
          >
            Create your first case study
          </Link>
        </div>
      ) : (
        <div className="bg-brand-navy border border-brand-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Client
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Sector
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Date
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {caseStudies.map((cs) => (
                <tr key={cs.id} className="hover:bg-brand-dark/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/case-studies/${cs.id}/edit`}
                        className="text-brand-white hover:text-brand-accent transition-colors text-sm font-medium"
                      >
                        {cs.title}
                      </Link>
                      {cs.featured && (
                        <span className="text-xs bg-brand-accent/10 text-brand-accent px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-brand-gray text-sm">
                    {cs.client}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-brand-blue/30 text-brand-gray px-2 py-0.5 rounded capitalize">
                      {cs.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        cs.published
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {cs.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-gray text-sm">
                    {formatDate(cs.publishedAt || cs.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/case-studies/${cs.id}/edit`}
                        className="text-brand-gray hover:text-brand-accent transition-colors text-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        id={cs.id}
                        endpoint="/api/case-studies"
                        itemName={cs.title}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
