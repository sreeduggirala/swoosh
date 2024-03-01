'use client';
import AccountConnect from '@/components/layout/header/AccountConnect';
import React from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const redirectToHomePage = () => {
    // Check if running in the client-side environment
    if (typeof window !== 'undefined') {
      // Redirect to the desired page after successful authentication
      router.push('/home');
    }
  };
  // Redirect if connected
  if (useAccount().status == 'connected') {
    redirectToHomePage();
  }
  return (
    <div className="  flex h-screen flex-col items-center justify-center ">
      <h1 className=" mb-32 text-6xl tracking-widest text-blue-100 ">SWOOSH</h1>
      <div className="w-64 ">
        <AccountConnect />
      </div>
    </div>
  );
}
