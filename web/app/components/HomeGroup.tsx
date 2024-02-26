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
}

const Group = (props: GroupProps) => {
  return (
    <div className="bg-gray w-full rounded-lg px-8 py-8 text-lg">
      <p>Swoosh</p>
      <p className="text-4xl font-semibold">{props.type}</p>
      <p className="pt-6 text-6xl font-semibold">3</p>
      <Link href="/home">
        <button>View All →</button>
      </Link>
    </div>
  );
};

const HomeGroup = () => {
  return (
    <div className="flex w-full justify-evenly gap-4 ">
      <Group type="In" />
      <Group type="Out" />
    </div>
  );
};

export default HomeGroup;
