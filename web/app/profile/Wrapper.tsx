'use client';
import AccountConnect from '@/components/layout/header/AccountConnect';
import { AccountDropdown } from '@/components/layout/header/AccountDropdown';
import { AccountInfoPanel } from '@/components/layout/header/AccountInfoPanel';
import Header from 'app/components/Header';
import ProfileBalanceCard from 'app/components/ProfileBalanceCard';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import profile_icon from '../assets/logo.png';
import Image from 'next/image';
import { ThirdwebProvider, embeddedWallet, smartWallet, useAddress } from '@thirdweb-dev/react';
import {BaseSepoliaTestnet} from '@thirdweb-dev/chains';

const Wrapper = () => {

  const user_address =  useAddress();
  // const router = useRouter();

  // useEffect(() => {
  //   if (user_address==undefined) {
  //     router.push('/');
  //   }
  // }, [user_address]);

  return (
    <div className="flex flex-col px-4 pb-28 h-screen overflow-y-hidden rounded-sm">
      <div className="sticky top-0 z-10 h-full pb-28 bg-white">
        <Header title="Profile" />
        <div className='w-full flex justify-center'>
          <Image src={profile_icon} alt="profile picture" width={100} height={100} className='pb-4' />
        </div>
        <div className='w-full  flex flex-col space-y-8'>
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
          <ProfileBalanceCard />
          {/* <div className=" my-4 m-auto max-w-xs rounded-lg bg-gradient-to-br from-blue-200 to-blue-300 p-4 px-8 sm:max-w-md"> */}
          {/* {user_address != undefined ? 
              <AccountInfoPanel /> : <div></div>
            } */}
          {/* </div> */}
          </ThirdwebProvider>

        </div>
        
      </div>
    </div>
  );
};

export default Wrapper;
