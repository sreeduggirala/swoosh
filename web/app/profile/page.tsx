'use client';
import AccountConnect from '@/components/layout/header/AccountConnect';
import { AccountDropdown } from '@/components/layout/header/AccountDropdown';
import { AccountInfoPanel } from '@/components/layout/header/AccountInfoPanel';
import Header from 'app/components/Header';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAccount } from 'wagmi';

const ProfilePage = () => {

  const user_address = useAccount().address;
  const router = useRouter();

  useEffect(() => {
    if (user_address==undefined) {
      router.push('/');
    }
  }, [user_address]);

  return (
    <div>
      <Header title="PROFILE" />
      <div className="rounded-lg py-8 ">
        <div className=" m-auto max-w-xs rounded-lg bg-gradient-to-br from-blue-200 to-blue-300 p-4 px-8 sm:max-w-md">
          <AccountInfoPanel />
        </div>
      </div>
      
    </div>
  );
};

export default ProfilePage;
