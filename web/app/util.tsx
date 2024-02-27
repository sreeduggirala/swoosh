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
      address: '0xE0e4f202Ddee2850Ed29E3B7b59Bd205ac107E80',
      functionName,
      args,
      chainId: baseSepolia.id,
    });
  
    useEffect(() => {
      if (data != null) {
        const typedData = data as Request[]; // Cast the data to the correct type
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