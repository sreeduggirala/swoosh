'use client';
import './global.css';

import OnchainProviders from '@/OnchainProviders';

import React, { useEffect, useState } from 'react';
import { inter } from './fonts';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { usePathname, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit';
import { ThirdwebProvider, useAddress } from '@thirdweb-dev/react';
import {BaseSepoliaTestnet} from '@thirdweb-dev/chains';
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

// export const metadata: Metadata = {
//   manifest: '/manifest.json',
//   other: {
//     boat: '0.17.0',
//   },
// };

// Stat analytics before the App renders,
// so we can track page views and early events
// initAnalytics();

/** Root layout to define the structure of every page
 * https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isSignIn = usePathname() == '/';

  return (
    <html lang="en">
      <body className={`${isSignIn && 'gradient-background'} relative w-full`}>
        <OnchainProviders>
        <ThirdwebProvider
    activeChain={BaseSepoliaTestnet}
      clientId="3524eeab46d7c262cb23bcf072d92d5e"
    >
          <AppProvider isSignIn={isSignIn}>{children}</AppProvider>
          </ThirdwebProvider>
        </OnchainProviders>
      </body>
    </html>
  );
}

interface AppProviderProps {
  children: React.ReactNode;
  isSignIn: boolean; // Example additional prop
}

function AppProvider({ children, isSignIn }: AppProviderProps) {
  const user_address = useAddress(); 
  const router = useRouter();

  // useEffect(() => {
  //   if (user_address==undefined) {
  //     router.push('/');
  //   }
  // }, [user_address]);

  return (
    <div className={`m-auto ${inter.className}  ${isSignIn ? '' : ' max-w-md  md:max-w-2xl max-h-screen'}`}>
      {children}
      {isSignIn ? null : <Navbar />}
    </div>
  );
}
