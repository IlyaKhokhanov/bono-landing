import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import '@/styles/globals.scss';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wivo.netlify.app'),
  title: 'WIVO | Bank',
  description:
    'Introducing our innovative banking website that we can design for your unique needs. Offering both physical and virtual debit cards in addition to a user-friendly banking app. Create your personalized site with customized functionalities today.',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: 'WIVO | Bank',
    description:
      'Introducing our innovative banking website that we can design for your unique needs. Offering both physical and virtual debit cards in addition to a user-friendly banking app. Create your personalized site with customized functionalities today.',
    url: 'https://wivo.netlify.app',
    images: [
      {
        url: 'https://wivo.netlify.app/images/OG.jpg',
        width: 1200,
        height: 630,
        alt: 'WIVO Bank',
      },
    ],
    siteName: 'WIVO Bank',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
