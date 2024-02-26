"use client"; // This is a client component 👈🏽
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import swooshABI from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import { baseSepolia } from '@wagmi/core/chains';
import Image from 'next/image';

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
    address: '0x813722E1244b608a8d60fD5090C68bF6Ac12b602',
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
      <h1 className="text-2xl font-bold mb-4">HOME</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.map((request, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-lg">
            <Image src={request.imageURI} alt="Request Image" width={200} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">Request #{request.id}</h2>
              <p><strong>Creditor:</strong> {request.creditor}</p>
              <p><strong>Debtors:</strong> {request.debtors.join(', ')}</p>
              <p><strong>Amount:</strong> {request.amount} wei</p>
              <p><strong>Message:</strong> {request.message}</p>
              <p><strong>Timestamp:</strong> {new Date(parseInt(request.timestamp) * 1000).toLocaleString()}</p>
              <p><strong>Status:</strong> {request.fulfilled ? 'Fulfilled' : 'Pending'}</p>
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-8">

      </ul>
    </div>
  );
}
