import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
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
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
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
  jobTitle: 'Developer & Photographer',
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
      </body>
    </html>
  );
}
