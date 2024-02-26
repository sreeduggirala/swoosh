"use client"; // This is a client component 👈🏽
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import swooshABI from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import { baseSepolia } from '@wagmi/core/chains';
import Image from 'next/image';
import GroupsDisplay from './GroupDisplay'; // Adjust the path as necessary
import Header from './HeaderSwoosh';

interface RequestOut {
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


export default function Home() {
  const { address } = useAccount();
  const [result, setResult] = useState<RequestOut[]>([]);

  const { data, isLoading, error } = useReadContract({
    abi: swooshABI.abi,
    address: '0xE0e4f202Ddee2850Ed29E3B7b59Bd205ac107E80',
    functionName: 'getRequestsOut',
    args: [address],
    chainId: baseSepolia.id,
  });

  useEffect(() => {
    if (data != null) {
      const typedData = data as RequestOut[]; // Cast the data to the correct type
      setResult(typedData);
      console.log(typedData);
    }
  }, [data]);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="px-4 py-8">
      <Header />
      {/* Integrate GroupsDisplay here */}
      <GroupsDisplay requests={result} />

    </div>
  );
}
