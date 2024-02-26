import './global.css';

import OnchainProviders from '@/OnchainProviders';
import { headers } from 'next/headers';
import { usePathname } from 'next/navigation';

import { inter } from './fonts';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  other: {
    boat: '0.17.0',
  },
};

// Stat analytics before the App renders,
// so we can track page views and early events
// initAnalytics();

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList: Headers = headers();
  const referer: string | null = headersList.get('referer');
  let url: string | undefined;
  if (referer !== null) {
    url = new URL(referer).pathname;
  }

  return (
    <html lang="en" className={`${inter.className} `}>
      <body className="flex flex-1 flex-col">
        <OnchainProviders>{children}</OnchainProviders>
        {url != undefined && url != '/' ? <Navbar /> : null}
      </body>
    </html>
  );
}
