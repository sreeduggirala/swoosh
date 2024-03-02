'use client';
import './global.css';

import OnchainProviders from '@/OnchainProviders';

import React, { useEffect, useState } from 'react';
import { inter } from './fonts';
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import { usePathname, useRouter } from 'next/navigation';
import { ThirdwebProvider, embeddedWallet, smartWallet, useAddress, useContract,   ConnectWallet,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet, } from '@thirdweb-dev/react';
import {BaseSepoliaTestnet} from '@thirdweb-dev/chains';
import { isSignInPage } from 'app/util';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={`${isSignInPage() && 'gradient-background'} relative w-full`}>
        <OnchainProviders >
          <ThirdwebProvider
            activeChain={BaseSepoliaTestnet}
            clientId={process.env.CLIENT_ID}
            
            supportedWallets={[metamaskWallet({ recommended: true }),
              coinbaseWallet(),
              walletConnect(),
              smartWallet(
                embeddedWallet(), // any personal wallet
                {
                  factoryAddress: "0xFB5dA66aE989c5B1926a70107c9c8a75D5e5cEa5", // your deployed factory address
                  gasless: true, // enable or disable gasless transactions
                },
              ), 
            ]}
          >
           <AppWrapper>{children}</AppWrapper>
          </ThirdwebProvider>
        </OnchainProviders>
      </body>
    </html>
  );
}

function AppWrapper ({ children }: { children: React.ReactNode }) {
  return (
    <div className={`m-auto ${inter.className}  ${isSignInPage() ? null : ' max-w-lg  md:max-w-2xl '}`}>
      {children}
      {isSignInPage() ? null : <Navbar />}
    </div>
  );
}
