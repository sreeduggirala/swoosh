'use client'
import React, { useState } from 'react'
import Header from '../components/Header'
import {Button} from '../components/Button'
import SwooshProgressBar from '../components/SwooshProgressBar'
import Swoosh from 'app/components/Swoosh'
import { useAccount } from 'wagmi'
import { readSwooshContract } from 'app/util'

interface RequestInHeaderGroupProp{
  userBalance: number,
  owe: number
}
const RequestInHeaderGroup = (props: RequestInHeaderGroupProp) => {

  const user_address = useAccount().address;

  return <div className='w-full flex bg-gray rounded-lg'>
    
  <div className='p-3 px-4 w-1/2'>
    <p>Balance</p>
    <p className='font-semibold text-5xl py-4'>${String(Number((props.userBalance)) / (Math.pow(10, 18)))}</p>
    <div className="flex justify-center">
      <Button variant='Deposit' href='/requests_in/1'/>
    </div>
  </div>
  <div className='p-3 px-4 w-1/2'>
      <p>Owed</p>
      <p className='font-semibold text-5xl py-4'>${String(Number((props.owe)) / (Math.pow(10, 18)))}</p>
      <div className="flex justify-center">
        <Button variant='Withdraw' href='/requests_in/1'/>
      </div>
    </div>
    
  </div>
}

const RequestInGroup = () => {
  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);

  let result = readSwooshContract("getRequestsIn", [user_address], setResultOut);
  let dataResult = [];
  for (let i = 0; i < resultOut.length; i++) {
    dataResult.push({title: resultOut[i].message, href: '/requests_in/'+resultOut[i].id, amount: resultOut[i].amount});
  }

  
  return <div className=' grid grid-cols-2 gap-4 mt-8'>    
    {dataResult.map(request=><Swoosh  onClick={()=>{alert('sus')}} title={request.title} href={''} variant='button' amount={(Number((request.amount)) / (Math.pow(10, 18)))} percent={0} />)}
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


const RequestsInPage = () => {
  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [userBalance, setUserBalance] = useState<number>();
  const [owned, setOwned] = useState<Number>();
  
  let result = readSwooshContract("getBalance", [user_address], setUserBalance);
  result = readSwooshContract("getRequestsIn", [user_address], setResultOut);
  let sum = 0;
  for (let i = 0; i < resultOut.length; i++) {
    sum += Number(resultOut[i].amount);
  }
  return (
    <div className="px-4">
      {/* <div className="justify-center bg-white z-10 px-4"> */}
        <Header title="Awaiting Swooshes"/>
        <RequestInHeaderGroup userBalance={userBalance as number} owe={sum}/>
      {/* </div> */}
      <div className="overflow-y-scroll">
        <RequestInGroup/>
      </div>
    </div>
  )
}

export default RequestsInPage