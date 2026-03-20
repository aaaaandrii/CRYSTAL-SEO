import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getPageDef } from '@/lib/content-types';

export default async function PageBlocksPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageDef = getPageDef(page);
  if (!pageDef) notFound();

  // Fetch all section content for this page
  const rows = await prisma.pageContent.findMany({
    where: { page },
  });
  const contentMap = new Map(
    rows.map((r) => [r.section, JSON.parse(r.content) as Record<string, string>])
  );

  // Fetch item counts for blocks that have items
  const itemTypes = pageDef.blocks
    .flatMap((b) => b.items?.map((i) => i.type) ?? []);

  const itemCounts: Record<string, number> = {};
  if (itemTypes.length > 0) {
    const items = await prisma.contentItem.findMany({
      where: { type: { in: itemTypes } },
      select: { type: true },
    });
    for (const item of items) {
      itemCounts[item.type] = (itemCounts[item.type] || 0) + 1;
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/pages" className="text-sm text-brand-gray hover:text-brand-accent transition-colors">
          ← All Pages
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-brand-white">{pageDef.label}</h1>
        <p className="mt-1 text-sm text-brand-gray">{pageDef.description}</p>
      </div>

      <div className="space-y-3">
        {pageDef.blocks.map((block, index) => {
          const content = contentMap.get(block.id) || {};
          const hasFields = block.fields.length > 0;
          const totalItemCount = block.items?.reduce((sum, i) => sum + (itemCounts[i.type] || 0), 0) ?? 0;

          // Get preview values
          const heading = content.heading || content.label || content.leftHeading || '';
          const description = content.description || content.text || content.subheading || content.leftDescription || '';
          const rawImage = content.image || content.videoSrc || '';
          const image = rawImage.startsWith('/') || rawImage.startsWith('http') ? rawImage : '';
          const isSvg = image?.endsWith('.svg');

          return (
            <Link
              key={block.id}
              href={`/admin/pages/${page}/${block.id}`}
              className="group flex items-start gap-5 rounded-lg border border-brand-border/50 bg-brand-navy p-5 transition-all hover:border-brand-accent/40 hover:bg-brand-navy/80"
            >
              {/* Block number */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-brand-dark/60 text-xs font-bold text-brand-gray/50">
                {index + 1}
              </div>

              {/* Image preview if available */}
              {image && (
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#222]">
                  {isSvg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt="" className="h-full w-full object-contain p-1.5" />
                  ) : (
                    <Image src={image} alt="" fill className="object-cover" sizes="56px" />
                  )}
                </div>
              )}

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-brand-white group-hover:text-brand-accent transition-colors">
                    {block.label}
                  </h3>

                  {/* Badges */}
                  <div className="flex items-center gap-2">
                    {hasFields && (
                      <span className="rounded-full bg-brand-dark/50 px-2 py-0.5 text-[10px] text-brand-gray/50">
                        {block.fields.filter((f) => content[f.key]).length}/{block.fields.length} fields
                      </span>
                    )}
                    {block.items && block.items.map((itemDef) => (
                      <span key={itemDef.type} className="rounded-full bg-brand-accent/10 px-2 py-0.5 text-[10px] text-brand-accent/70">
                        {itemCounts[itemDef.type] || 0} {itemDef.labelPlural.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-0.5 text-xs text-brand-gray/50">{block.description}</p>

                {/* Content preview */}
                {(heading || description) && (
                  <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                    {heading && (
                      <p className="max-w-[300px] truncate text-xs text-brand-gray/70">
                        {heading}
                      </p>
                    )}
                    {description && !heading && (
                      <p className="max-w-[400px] truncate text-xs text-brand-gray/50">
                        {description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <span className="shrink-0 text-xs text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                Edit →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
