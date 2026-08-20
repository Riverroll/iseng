import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const siteUrl = 'https://uzl-portofolio.vercel.app';
const fullName = 'Nauval Uzlah';
const tagline = 'Developer & Photographer based in Indonesia.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${fullName} — Developer & Photographer`,
  description: `${fullName} (Val) is a developer and photographer based in Indonesia, building digital products and capturing moments.`,
  keywords: ['Nauval Uzlah', 'Uzlah', 'Nauval', 'Val', 'Riverroll', 'Developer', 'Photographer', 'Indonesia', 'Portfolio'],
  authors: [{ name: fullName, url: siteUrl }],
  creator: fullName,
  publisher: fullName,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: '1uhCN41ibGTXlqggrpUhHv06952xJFSbgn6nmo6-pW4',
  },
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: fullName,
    title: `${fullName} — Developer & Photographer`,
    description: tagline,
    images: [
      {
        url: '/images/profilephoto.JPG',
        width: 1200,
        height: 630,
        alt: fullName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${fullName} — Developer & Photographer`,
    description: tagline,
    images: ['/images/profilephoto.JPG'],
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: fullName,
  alternateName: 'Val',
  url: siteUrl,
  image: `${siteUrl}/images/profilephoto.JPG`,
  description: `${fullName} (Val) is a developer and photographer based in Indonesia, building digital products and capturing moments.`,
  jobTitle: 'Developer & Photographer',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'ID',
  },
  sameAs: [
    'https://www.linkedin.com/in/nauvaluzlah',
    'https://github.com/Riverroll',
    'https://instagram.com/riverwrks',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
