import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/utils';
import { DeleteButton } from '@/components/admin/DeleteButton';

interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  publishedAt: Date | null;
  createdAt: Date;
  tags: string;
}

export default async function AdminNewsPage() {
  const articles: ArticleListItem[] = await prisma.newsArticle.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      publishedAt: true,
      createdAt: true,
      tags: true,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-brand-white">News Articles</h1>
        <Link
          href="/admin/news/new"
          className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Create New
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-brand-navy border border-brand-border rounded-lg p-12 text-center">
          <p className="text-brand-gray mb-4">No news articles yet.</p>
          <Link
            href="/admin/news/new"
            className="text-brand-accent hover:underline text-sm"
          >
            Create your first article
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
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Tags
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
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-brand-dark/30 transition-colors">
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/news/${article.id}/edit`}
                      className="text-brand-white hover:text-brand-accent transition-colors text-sm font-medium"
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        article.published
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {article.tags ? (
                      <div className="flex gap-1 flex-wrap">
                        {article.tags.split(',').map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-brand-blue/30 text-brand-gray px-1.5 py-0.5 rounded"
                          >
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-brand-gray/50 text-xs">--</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-brand-gray text-sm">
                    {formatDate(article.publishedAt || article.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/news/${article.id}/edit`}
                        className="text-brand-gray hover:text-brand-accent transition-colors text-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        id={article.id}
                        endpoint="/api/news"
                        itemName={article.title}
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
