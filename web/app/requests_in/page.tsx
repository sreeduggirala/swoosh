'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '../components/Button';
import SwooshProgressBar from '../components/SwooshProgressBar';
import Swoosh from 'app/components/Swoosh';
import { useAccount } from 'wagmi';
import { readSwooshContract } from 'app/util';
import { DepositERC20 } from 'app/components/deposit';
import { WithdrawERC20 } from 'app/components/Withdraw';

interface RequestInHeaderGroupProp {
  userBalance: number;
  owe: number;
}

function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toFixed(2);
  } else {
    let divisor = 1;
    let unit = '';

    if (num >= 1e9) {
      divisor = 1e9;
      unit = 'b';
    } else if (num >= 1e6) {
      divisor = 1e6;
      unit = 'm';
    } else if (num >= 1e3) {
      divisor = 1e3;
      unit = 'k';
    }

    const formattedNumber = (num / divisor).toFixed(2) + unit;
    return formattedNumber;
  }
}

const RequestInHeaderGroup = (props: RequestInHeaderGroupProp) => {
  const user_address = useAccount().address;

  return (
    <div className="flex w-full rounded-lg bg-gray">
      <div className="w-1/2 p-3 px-4">
        <p>Balance</p>
        <p className="py-4 text-5xl font-semibold">
          ${formatNumber(Number(props.userBalance) / Math.pow(10, 18))}
        </p>
        <div className="flex justify-center">
          <Button
            variant="Deposit"
            href="/"
            onClick={() => document.getElementById('deposit_modal').showModal()}
          />
        </div>
      </div>
      <div className="w-1/2 p-3 px-4">
        <p>Owed</p>
        <p className="py-4 text-5xl font-semibold">
          ${formatNumber(Number(props.owe) / Math.pow(10, 18))}
        </p>
        <div className="flex justify-center">
          <Button variant="Withdraw" href="/" onClick={()=> document.getElementById('withdraw_modal').showModal()} />
        </div>
        </div></div>
  );
};

const RequestInGroup = () => {
  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);

  let result = readSwooshContract('getRequestsIn', [user_address], setResultOut);
  let dataResult = [];
  for (let i = 0; i < resultOut.length; i++) {
    dataResult.push({
      title: resultOut[i].message,
      href: '/requests_in/' + resultOut[i].id,
      amount: resultOut[i].amount,
    });
  }

  
  return <div className=' grid grid-cols-2 gap-4 mt-8d max-h-screen overflow-y-auto'>    
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
  const [deposit, setDeposit] = useState();
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [userBalance, setUserBalance] = useState<number>();
  const [owned, setOwned] = useState<Number>();

  let result = readSwooshContract('getBalance', [user_address], setUserBalance);
  result = readSwooshContract('getRequestsIn', [user_address], setResultOut);
  let sum = 0;
  for (let i = 0; i < resultOut.length; i++) {
    sum += Number(resultOut[i].amount);
  }
  return (
    <div className="flex flex-col px-4 pb-20">
      <div className="sticky top-0 z-10 bg-white w-full pb-4">
      <Header title="Awaiting Swooshes" />
      <RequestInHeaderGroup userBalance={userBalance as number} owe={sum} />
      </div>
      <div className="pb-4">
        <RequestInGroup />
      </div>
      <dialog id="deposit_modal" className="modal">
        <div className="modal-box font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
          <form method="dialog " className="flex w-full justify-evenly gap-2">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            </form>
          <DepositERC20/>          
          </div>
        
      </dialog>    
      <dialog id="withdraw_modal" className="modal">
        <div className="modal-box font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
          <form method="dialog " className="flex w-full justify-evenly gap-2">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            </form>
          <WithdrawERC20/>          
          </div>
        
      </dialog>  
       </div>
  );
};

export default RequestsInPage;