'use client'; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import HomeHeader from '../components/HomeHeader';
import HomeGroup from '../components/HomeGroup';
import { readSwooshContract } from 'app/util';
import { ThirdwebProvider, embeddedWallet, smartWallet, useAddress } from '@thirdweb-dev/react';
import { BaseSepoliaTestnet } from '@thirdweb-dev/chains';
import Wrapper from './wrapper';
export default function HomePage() {

  return (
    <div className="px-4 pb-6">
        <ThirdwebProvider
    activeChain={BaseSepoliaTestnet}
      clientId="3524eeab46d7c262cb23bcf072d92d5e"
      supportedWallets={[
        smartWallet(
          embeddedWallet(), // any personal wallet
          {
            factoryAddress: "0xFB5dA66aE989c5B1926a70107c9c8a75D5e5cEa5", // your deployed factory address
            gasless: true, // enable or disable gasless transactions
          },
        ),
      ]}

    >
      <Wrapper></Wrapper>
      </ThirdwebProvider>
    </div>
  );

}   