'use client'; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import swooshABI from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import { baseSepolia } from '@wagmi/core/chains';
import HomeHeader from '../components/HomeHeader';
import HomeGroup from '../components/HomeGroup';
import { readSwooshContract } from 'app/util';
import Link from 'next/link'
import Modal from 'react-bootstrap/Modal';


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

  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [resultIn, setResultIn] = useState<Request[]>([]);
  const [show, setShow] = useState(true);

  let result = readSwooshContract('getRequestsOut', [user_address], setResultOut);


  result = readSwooshContract('getRequestsIn', [user_address], setResultIn);


  if (result.isLoading) return <p>Loading...</p>;
  if (result.error) return <p>Error: {result.error.message}</p>;


  return (
    <div className="py-8 px-4">
      <HomeHeader />
      <HomeGroup inNumber={resultIn.length} outNumber={resultOut.length}/>
      
    </div>
  );

  interface HomeGroupProp{
    inNumber: number,
    outNumber: number
  }
}
