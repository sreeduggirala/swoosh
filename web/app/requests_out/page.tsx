'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import { Button } from '../components/Button';
import Swoosh from '../components/Swoosh';
import { useAccount } from 'wagmi';
import { readSwooshContract } from 'app/util';
import {DepositERC20} from "../components/deposit";
interface RequestOutHeaderGroupProp {
  userBalance: number;
  owned: number;
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

const RequestOutHeaderGroup = (props: RequestOutHeaderGroupProp) => {
  return (
    <div className="  flex w-full rounded-lg bg-gray">
      <div className="w-1/2 p-3 px-4">
        <p>Balance</p>
        <p className="py-4 text-5xl font-semibold">
          ${formatNumber(Number(props.userBalance as number) / Math.pow(10, 18))}
        </p>
        <div className="flex justify-center">
          <Button
            variant="Deposit"
            href=""
            onClick={() => document.getElementById('deposit_modal').showModal()}
          />
        </div>
      </div>
      <div className="w-1/2 p-3 px-4">
        <p>Owed</p>
        <p className="py-4 text-5xl font-semibold">
          ${formatNumber(Number(props.owned as number) / Math.pow(10, 18))}
        </p>
        <div className="flex justify-center">
          <Button variant="Withdraw" href="/requests_in/1" />
        </div>
      </div>
    </div>
  );
};



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

  let result = readSwooshContract('getRequestsOut', [user_address], setResultOut);
  let dataResult = [];
  for (let i = 0; i < resultOut.length; i++) {
    dataResult.push({
      title: resultOut[i].message,
      percent: resultOut[i].paid.length / (resultOut[i].debtors.length + resultOut[i].paid.length),
      href: '/requests_out/' + resultOut[i].id,
    });
  }
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {dataResult.map((request) => (
        <Swoosh
          onClick={() => console.log('PAY MONEY')}
          percent={request.percent}
          title={request.title}
          href={request.href}
        />
      ))}
    </div>
  );
};

const RequestsOutPage = () => {
  const [deposit, setDeposit] = useState();
  const user_address = useAccount().address;
  const [resultOut, setResultOut] = useState<Request[]>([]);
  const [userBalance, setUserBalance] = useState<number>();
  const [owned, setOwned] = useState<Number>();

  let result = readSwooshContract('getBalance', [user_address], setUserBalance);
  result = readSwooshContract('getRequestsOut', [user_address], setResultOut);
  let sum = 0;
  for (let i = 0; i < resultOut.length; i++) {
    sum += Number(resultOut[i].amount) * resultOut[i].debtors.length;
  }
  return (
    <div className="flex flex-col px-4 pb-20">
      <div className="sticky top-0 z-10 bg-white w-full pb-4">
        <Header title="Your Swooshes"/>
        <RequestOutHeaderGroup userBalance={userBalance as number} owned={sum} />
      </div>
      <div className="pb-4">
        <RequestOutGroup/>
      </div>
      <dialog id="deposit_modal" className="modal">
        <div className="modal-box font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
          <h3 className=" py-6 text-xl">How much do you want to deposit?</h3>
          <form method="dialog " className="flex w-full justify-evenly gap-2">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

            </form>
          <DepositERC20/>          
          </div>
        
      </dialog>
    </div>
  );
};

export default RequestsOutPage;