'use client'; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { useAccount,useReadContract } from 'wagmi';
import HomeHeader from '../components/HomeHeader';
import HomeGroup from '../components/HomeGroup';
import { readSwooshContract } from 'app/util';
import { useAddress } from '@thirdweb-dev/react';

interface Request {
  id: string;
  creditor: string;
  debtors: string[];
  paid: any[]; // Adjust the type according to what `paid` actually contains
  declined: any[]; // Same here, adjust the type as necessary
  amount: string;
  message: string;
  imageURI: string;
  timestamp: string;
  fulfilled: boolean;
  cancelled: boolean;
}

export default function Wrapper() {

  const user_address = useAddress();
  // console.log(user_address);
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [resultIn, setResultIn] = useState<Request[]>([]);

  let result = readSwooshContract('getRequestsOut', [user_address], setResultOut);
  result = readSwooshContract('getRequestsIn', [user_address], setResultIn);

  if (result.isLoading) return <p>Loading ...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;

  return (
    <div className="px-4 py-8">
      <HomeHeader />
      <HomeGroup inNumber={resultIn.length} outNumber={resultOut.length} />
    </div>
  );

  interface HomeGroupProp {
    inNumber: number;
    outNumber: number;
  }
}   