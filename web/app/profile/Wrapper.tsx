'use client';
import AccountConnect from '@/components/layout/header/AccountConnect';
import { AccountDropdown } from '@/components/layout/header/AccountDropdown';
import { AccountInfoPanel } from '@/components/layout/header/AccountInfoPanel';
import Header from 'app/components/Header';
import ProfileBalanceCard from 'app/components/ProfileBalanceCard';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';
import profile_icon from '../assets/logo.svg';
import Image from 'next/image';
import { ConnectWallet, ThirdwebProvider, embeddedWallet, smartWallet, toWei, useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';
import {BaseSepoliaTestnet} from '@thirdweb-dev/chains';

const Wrapper = () => {

  const user_address =  useAddress();
  const { contract } = useContract(process.env.ERC20_ADDRESS);
  let { mutateAsync: depositMutateAsync, isLoading, error } = useContractWrite(
    contract,
    "mint",
  );
 
  const callFaucet = async () => {
    depositMutateAsync({args:[user_address, toWei(10000)]});
  }

  return (
    <div className="flex flex-col px-4 pb-28 h-screen overflow-y-hidden rounded-sm">
        <div className="sticky top-0 z-10 h-full pb-28 bg-white">
          <div className="py-12 pb-8 flex justify-between w-full">
            <p className="font-Inter text-4xl tracking-widest">Profile</p>
            <button className="text-blue-700 text-lg font-semibold bg-white rounded-full outline px-2 opacity-50" onClick={callFaucet}>Faucet (10k)</button>
          </div>
        <div className='w-full flex justify-center'>
          <Image src={profile_icon} alt="profile picture" width={100} height={100} className='pb-4' />
        </div>
        <div className='w-full  flex flex-col space-y-8'>

          <ProfileBalanceCard />
          {/* <div className=" my-4 m-auto max-w-xs rounded-lg bg-gradient-to-br from-blue-200 to-blue-300 p-4 px-8 sm:max-w-md"> */}
          {/* {user_address != undefined ? 
              <AccountInfoPanel /> : <div></div>
            } */}
          {/* </div> */}
          <ConnectWallet />

        </div>
        
      </div>
    </div>
  );
};

export default Wrapper;