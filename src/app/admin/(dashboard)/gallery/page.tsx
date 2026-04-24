import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { DeleteButton } from '@/components/admin/DeleteButton';

interface GalleryItemData {
  title?: string;
  subtitle?: string;
  tag?: string;
  image?: string;
  imageAlt?: string;
}

export default async function AdminGalleryPage() {
  const rows = await prisma.contentItem.findMany({
    where: { type: 'gallery' },
    orderBy: { sortOrder: 'asc' },
  });

  const items = rows.map((row) => {
    const data = JSON.parse(row.data) as GalleryItemData;
    return {
      id: row.id,
      sortOrder: row.sortOrder,
      published: row.published,
      title: data.title ?? '',
      subtitle: data.subtitle ?? '',
      tag: data.tag ?? '',
      image: data.image ?? '',
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-white">Gallery</h1>
          <p className="mt-1 text-sm text-brand-gray">
            Featured works on the Case Studies page.
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="bg-brand-accent hover:bg-brand-accent/80 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
        >
          Add Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-brand-navy border border-brand-border rounded-lg p-12 text-center">
          <p className="text-brand-gray mb-4">No gallery items yet.</p>
          <Link
            href="/admin/gallery/new"
            className="text-brand-accent hover:underline text-sm"
          >
            Add your first gallery item
          </Link>
        </div>
      ) : (
        <div className="bg-brand-navy border border-brand-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Image
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Tag
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Order
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-brand-gray uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-brand-dark/30 transition-colors"
                >
                  <td className="px-6 py-3">
                    {item.image ? (
                      <div className="relative h-12 w-16 overflow-hidden rounded bg-[#222]">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-16 rounded bg-[#222]" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/gallery/${item.id}/edit`}
                      className="text-brand-white hover:text-brand-accent transition-colors text-sm font-medium"
                    >
                      {item.title || <span className="italic text-brand-gray">(untitled)</span>}
                    </Link>
                    {item.subtitle && (
                      <p className="mt-0.5 text-xs text-brand-gray">
                        {item.subtitle}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-brand-blue/30 text-brand-gray px-2 py-0.5 rounded">
                      {item.tag || '—'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        item.published
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-brand-gray text-sm">
                    {item.sortOrder}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/gallery/${item.id}/edit`}
                        className="text-brand-gray hover:text-brand-accent transition-colors text-sm"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        id={item.id}
                        endpoint="/api/items"
                        itemName={item.title || 'this gallery item'}
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
