'use client'; // This is a client component 👈🏽
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import swooshABI from '../../contracts/out/Swoosh.sol/Swoosh.json';
import { baseSepolia } from '@wagmi/core/chains';
import HomeHeader from './components/HomeHeader';
import HomeGroup from './components/HomeGroup';

export function readSwooshContract(functionName: string, args: any[], setResult: any): readSwooshContractReturn {
    const { data, isLoading, error } = useReadContract({
      abi: swooshABI.abi,
      address: '0x813722E1244b608a8d60fD5090C68bF6Ac12b602',
      functionName,
      args,
      chainId: baseSepolia.id,
    });
  
    useEffect(() => {
      if (data != null) {
        const typedData = data; // Cast the data to the correct typ
        setResult(typedData);
        console.log(typedData);
      }
    }, [data]);
    let result = {
      data: data,
      isLoading: isLoading,
      error: error
    }
    return result;
  
  }
export interface readSwooshContractReturn {
    data: any,
    isLoading: boolean,
    error: any
  } 