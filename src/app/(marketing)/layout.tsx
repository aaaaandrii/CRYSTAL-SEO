// Marketing pages read content from the database (PageContent / ContentItem
// tables) that can change any time via the admin panel. Force dynamic
// rendering so fresh DB content is read on every request instead of being
// baked into static HTML at build time.
export const dynamic = 'force-dynamic';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
