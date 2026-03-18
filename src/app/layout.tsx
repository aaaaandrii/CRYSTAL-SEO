import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Eternal Data Storage in Quartz Glass`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    '5D memory crystal',
    'eternal data storage',
    'quartz glass storage',
    '5D optical storage',
    'permanent data preservation',
    'femtosecond laser writing',
    'archival storage',
    'billion year storage',
    'Swiss-made crystal storage',
    'space-proven data storage',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Eternal Data Storage in Quartz Glass`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Eternal Data Storage`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Eternal Data Storage in Quartz Glass`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
    creator: '@5dMemoryCrystal',
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: [
    'https://twitter.com/5dMemoryCrystal',
    'https://linkedin.com/company/5d-memory-crystal',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@5dmemorycrystal.com',
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CH',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd data={organizationJsonLd} />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
