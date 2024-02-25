import AccountConnect from '@/components/layout/header/AccountConnect';
import React from 'react';

function SignInPage() {
  return (
    <div className=" container flex h-screen flex-col items-center justify-center  text-center">
      <h1 className=" mb-32 text-6xl ">SWOOSH</h1>
      <div className="w-64 ">
        <AccountConnect />
      </div>
    </div>
  );
}

export default SignInPage;
