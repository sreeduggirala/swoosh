'use client';
import './global.css';

import OnchainProviders from '@/OnchainProviders';

import React, { useEffect, useState } from 'react';
import { inter } from './fonts';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { usePathname, useRouter } from 'next/navigation';
import { ThirdwebProvider, embeddedWallet, smartWallet, useAddress } from '@thirdweb-dev/react';
import {BaseSepoliaTestnet} from '@thirdweb-dev/chains';
import {PrivyProvider} from '@privy-io/react-auth';
import {SmartAccountProvider} from "../src/hooks/SmartAccountContext";
export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isSignIn = usePathname() == '/';

  return (
    <html lang="en">
      <body className={`${isSignIn && 'gradient-background'} relative w-full`}>
      <PrivyProvider {...insertYourPrivyProviderProps} >
  <SmartAccountProvider>
        <OnchainProviders>
        <ThirdwebProvider
    activeChain={BaseSepoliaTestnet}
      clientId="3524eeab46d7c262cb23bcf072d92d5e"
    >
          <AppProvider isSignIn={isSignIn}>{children}</AppProvider>
          </ThirdwebProvider>
        </OnchainProviders>
        </SmartAccountProvider>
</PrivyProvider>
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
    <div className={`m-auto ${inter.className}  ${isSignIn ? '' : ' max-w-lg  md:max-w-2xl '}`}>
      {children}
      {isSignIn ? null : <Navbar />}
    </div>
  );
}

