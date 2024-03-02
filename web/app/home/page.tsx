'use client'; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import HomeHeader from '../components/HomeHeader';
import HomeGroup from '../components/HomeGroup';
import { readSwooshContract } from 'app/util';
import { ThirdwebProvider, embeddedWallet, smartWallet, useAddress } from '@thirdweb-dev/react';
import { BaseSepoliaTestnet } from '@thirdweb-dev/chains';

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

export default function HomePage() {
  const user_address = useAddress();

  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [resultIn, setResultIn] = useState<Request[]>([]);
  const [resultInLength, setResultInLength] = useState<number>();
  useEffect(()=> {
    let sum = 0;
    resultIn.map((res)=> {
      if (res.debtors.includes(user_address as string)) {
        sum++;
      }
    })
    setResultInLength(sum);
  }, [resultIn])
  let result = readSwooshContract('getRequestsOut', [user_address], setResultOut);
  result = readSwooshContract('getRequestsIn', [user_address], setResultIn);

  function getPercentPaid(){
    console.log(resultOut);
    
    // return resultOut
  }


  if (result.isLoading) return <p>Loading ...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;
  
  return (
    <div className=" pb-6 h-screen ">
        <div className=" py-8">
          <HomeHeader />
          <HomeGroup inNumber={resultInLength as number} outNumber={resultOut.length}  />
        </div>
    </div>
  );

}   