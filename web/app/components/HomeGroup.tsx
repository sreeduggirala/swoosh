import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { baseSepolia } from '@wagmi/core/chains';
import swooshABI from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import Link from 'next/link';
export interface RequestOut {
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
interface GroupProps {
  type: string;
  num:number;
}

const Group = (props: GroupProps) => {
  return (
    <div className="bg-gray w-full rounded-lg px-8 py-8 text-lg">
      <p>Swoosh</p>
      <p className="text-4xl font-semibold">{props.type}</p>
      <p className="pt-6 text-6xl font-semibold">{props.num}</p>
      <Link href="/home">
        <button>View All →</button>
      </Link>
    </div>
  );
};
interface HomeGroupProp{
  inNumber: number,
  outNumber: number
}

const HomeGroup = (props: HomeGroupProp) => {
  return (
    <div className="flex w-full justify-evenly gap-4">
      <Link href="/requests_in" className="no-underline w-full"><Group type="In" num={props.inNumber}/></Link>
      <Link href="/requests_out" className="no-underline w-full"><Group type="Out" num={props.outNumber}/></Link>
    </div>
  );
};

export default HomeGroup;
