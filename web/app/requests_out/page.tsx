'use client'
import React, { useState } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import Swoosh from '../components/Swoosh'
import { useAccount } from 'wagmi'
import { readSwooshContract } from 'app/util'

interface RequestOutHeaderGroupProp{
  userBalance: number,
  owned: number
}

const RequestOutHeaderGroup = (props: RequestOutHeaderGroupProp) => {


  return <div className='w-full flex justify-around  bg-gray rounded-lg'>
  <div className='p-6 px-8'>
    <p>Balance</p>
    <p className='font-semibold text-4xl py-2'>{String(Number((props.userBalance as number)) / (Math.pow(10, 18)))} eth</p>
      <Button  variant='Deposit' href='/requests_in/1'/>
  </div>
  <div className='p-6 px-8'>
    <p>Owed</p>
    <p className='font-semibold text-4xl py-2'>{String(Number((props.owned as number)) / (Math.pow(10, 18)))} eth</p>
    <Button variant='Withdraw' href='/requests_in/1'/>
  </div>
  </div>
}

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


const RequestOutGroup = () => {
  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);

  let result = readSwooshContract("getRequestsOut", [user_address], setResultOut);
  let dataResult = [];
  for (let i = 0; i < resultOut.length; i++) {
    dataResult.push({title: resultOut[i].message, percent: resultOut[i].paid.length / (resultOut[i].debtors.length + resultOut[i].paid.length), href: '/requests_out/'+resultOut[i].id});
  }
  return <div className='grid grid-cols-2 gap-4 mt-8'>
    {dataResult.map(request=><Swoosh  percent={request.percent} title={request.title} href={request.href}/>)}
  </div>
}



const RequestsOutPage = () => {
  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [userBalance, setUserBalance] = useState<number>();
  const [owned, setOwned] = useState<Number>();
  
  let result = readSwooshContract("getBalance", [user_address], setUserBalance);
  result = readSwooshContract("getRequestsOut", [user_address], setResultOut);
  let sum = 0;
  for (let i = 0; i < resultOut.length; i++) {
    sum += Number(resultOut[i].amount) * resultOut[i].debtors.length
    ;
  }
  return (
    <div className="px-4">
      <Header title="Awaiting Swooshes"/>
      <RequestOutHeaderGroup userBalance={userBalance as number} owned={sum} />
      <RequestOutGroup/>
    </div>
  )
}

export default RequestsOutPage