'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import swooshABI from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import { baseSepolia } from '@wagmi/core/chains';

export default function Home() {
  //
  const { address } = useAccount();

  // State to store the result
  const [result, setResult] = useState('');

  // Call the useContractRead hook with the contract address, ABI, method name, and method arguments
  const { data, isLoading, error } = useReadContract({
    abi: swooshABI.abi,
    address: '0x813722E1244b608a8d60fD5090C68bF6Ac12b602',
    functionName: 'getRequestsOut',
    args: [address],
    chainId: baseSepolia.id,
  });

  // useEffect to handle data changes
  useEffect(() => {
    if (data != null) {
      // Update the state with the result
      setResult(data as any);
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <h1>HOME</h1>
      <ul>
        <Link href={`/home/1`}>
          <li>GROUP 1</li>
        </Link>
        <Link href={`/home/2`}>
          <li>GROUP 2</li>
        </Link>
        <Link href={`/home/3`}>
          <li>GROUP 3</li>
        </Link>
      </ul>
    </div>
  );
}
