'use client';
import AccountConnect from '@/components/layout/header/AccountConnect';
import React from 'react';

function SignInPage() {
  return (
    <div className="  flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-black">
      <h1 className=" mb-32 text-6xl tracking-widest text-blue-100 ">SWOOSH</h1>
      <div className="w-64 ">
        <AccountConnect />
      </div>
    </div>
  );
}

export default SignInPage;
