'use client'
import React, { useState } from 'react';
import Header from '../../components/Header';
import Total from '../../components/Total';
import MembersList from "../../components/MembersList"

//TESTING
import {Button} from 'app/components/Button';
import { useAccount } from 'wagmi';
import { readSwooshContract, readSwooshContractAndOnlyGetResult } from 'app/util';

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
  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [userBalance, setUserBalance] = useState<number>();
  const [owned, setOwned] = useState<Number>();

  let result = readSwooshContract("getBalance", [user_address], setUserBalance);
  result = readSwooshContract("getRequestsOut", [user_address], setResultOut);
  // let chosenResult = resultOut[parseInt(params.request_id)];
  // console.log('chosen result : ')
  // console.log(chosenResult);
  // let sumPrice = chosenResult.debtors.length * parseInt(chosenResult.amount) / Math.pow(10, 18);
  return (
    <div className="px-4">
      <Header title={'Uber Denver'} />
      <Total percent={resultOut[parseInt(params.request_id)]?.paid.length / (resultOut[parseInt(params.request_id)]?.paid.length + resultOut[parseInt(params.request_id)]?.debtors.length)} price={resultOut[parseInt(params.request_id)]?.debtors.length * parseInt(resultOut[parseInt(params.request_id)]?.amount) / Math.pow(10, 18) }/>
      <MembersList debtMembers={resultOut[parseInt(params.request_id)]?.debtors} paidMembers={resultOut[parseInt(params.request_id)]?.paid} total={resultOut[parseInt(params.request_id)]?.debtors.length * parseInt(resultOut[parseInt(params.request_id)]?.amount) / Math.pow(10, 18)}/>
    </div>
  );
}

export default RequestPage_Out;
