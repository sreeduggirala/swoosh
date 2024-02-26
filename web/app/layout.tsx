import './global.css';

import OnchainProviders from '@/OnchainProviders';

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
  const isSignIn = children.props.childProp.segment == '__PAGE__';
  return (
    <html
      lang="en"
      className={` ${inter.className} relative m-auto  ${
        isSignIn ? '' : ' max-w-sm  md:max-w-2xl '
      }`}
    >
      <body className="">
        <OnchainProviders>{children}</OnchainProviders>
        {isSignIn ? null : <Navbar />}
      </body>
    </html>
  );
}
