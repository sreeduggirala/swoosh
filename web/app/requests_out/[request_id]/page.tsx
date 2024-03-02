'use client'
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Total from '../../components/Total';
import MembersList from "../../components/MembersList"

//TESTING
import {Button} from 'app/components/Button';
import { useAccount } from 'wagmi';
import { readSwooshContract, readSwooshContractAndOnlyGetResult } from 'app/util';
import { useAddress, useContract } from '@thirdweb-dev/react';

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

function RequestPage_Out({ params }: { params: { request_id: string } }) {
  const user_address = useAddress();
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [userBalance, setUserBalance] = useState<number>();
  const [owned, setOwned] = useState<Number>();

  let {contract} = useContract(process.env.CONTRACT_ADDRESS);
  // useEffect(() => { 
  //   contract?.call("getBalance", [user_address]).then((data)=> {
  //     console.log(data);
  //     setUserBalance(data);
  //   });

  // }, [userBalance])  
  let result = readSwooshContract("getRequestsOut", [user_address], setResultOut);
  // let chosenResult = resultOut[parseInt(params.request_id)]; 
  // console.log('chosen result : ')
  // console.log(chosenResult);
  // let sumPrice = chosenResult.debtors.length * parseInt(chosenResult.amount) / Math.pow(10, 18);
  return (
    <div className="px-4">
      <Header title={resultOut[parseInt(params.request_id)]?.message} />
      <Total percent={100 * resultOut[parseInt(params.request_id)]?.paid.length / (resultOut[parseInt(params.request_id)]?.paid.length + resultOut[parseInt(params.request_id)]?.debtors.length)} price={resultOut[parseInt(params.request_id)]?.debtors.length * parseInt(resultOut[parseInt(params.request_id)]?.amount) / Math.pow(10, 18) }/>
      <MembersList debtMembers={resultOut[parseInt(params.request_id)]?.debtors} paidMembers={resultOut[parseInt(params.request_id)]?.paid} total={(resultOut[parseInt(params.request_id)]?.debtors.length + resultOut[parseInt(params.request_id)]?.paid.length) * parseInt(resultOut[parseInt(params.request_id)]?.amount) / Math.pow(10, 18)}/>
    </div> 
  );
} 

export default RequestPage_Out;
