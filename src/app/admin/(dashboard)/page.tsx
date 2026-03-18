import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';

interface RecentItem {
  id: string;
  title: string;
  published: boolean;
  createdAt: Date;
}

export default async function AdminDashboard() {
  const [newsCount, caseStudyCount, recentNews, recentCaseStudies] =
    await Promise.all([
      prisma.newsArticle.count({ where: { published: true } }),
      prisma.caseStudy.count({ where: { published: true } }),
      prisma.newsArticle.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
        },
      }),
      prisma.caseStudy.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
        },
      }),
    ]);

  const recentItems = [
    ...(recentNews as RecentItem[]).map((n: RecentItem) => ({ ...n, type: 'news' as const })),
    ...(recentCaseStudies as RecentItem[]).map((c: RecentItem) => ({ ...c, type: 'case-study' as const })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-white mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <StatCard
          title="Published News"
          count={newsCount}
          href="/admin/news"
        />
        <StatCard
          title="Published Case Studies"
          count={caseStudyCount}
          href="/admin/case-studies"
        />
      </div>

      <div className="bg-brand-navy border border-brand-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-brand-white mb-4">
          Recent Activity
        </h2>
        {recentItems.length === 0 ? (
          <p className="text-brand-gray text-sm">No content yet.</p>
        ) : (
          <div className="space-y-3">
            {recentItems.map((item) => (
              <div
                key={`${item.type}-${item.id}`}
                className="flex items-center justify-between py-3 border-b border-brand-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-medium ${
                      item.type === 'news'
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'bg-purple-500/10 text-purple-400'
                    }`}
                  >
                    {item.type === 'news' ? 'News' : 'Case Study'}
                  </span>
                  <Link
                    href={`/admin/${item.type === 'news' ? 'news' : 'case-studies'}/${item.id}/edit`}
                    className="text-brand-white hover:text-brand-accent transition-colors text-sm"
                  >
                    {item.title}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      item.published
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}
                  >
                    {item.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-brand-gray text-xs">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  title,
  count,
  href,
}: {
  title: string;
  count: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-brand-navy border border-brand-border rounded-lg p-6 hover:border-brand-accent/50 transition-colors group"
    >
      <p className="text-brand-gray text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-brand-white group-hover:text-brand-accent transition-colors">
        {count}
      </p>
    </Link>
  );
}
