import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { baseSepolia } from '@wagmi/core/chains';
import swooshABI from '../../../../contracts/out/Swoosh.sol/Swoosh.json';
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
    <div className="bg-gray w-48 rounded-lg px-8 py-8 text-lg">
      <p>Swoosh</p>
      <p className="text-4xl font-semibold">{props.type}</p>
      <p className="pt-6 text-6xl font-semibold">3</p>
    </div>
  );
};

const HomeGroup = () => {
  const contract_address = process.env.CONTRACT_ADDRESS;
  const user_address = useAccount().address;
  const [result, setResult] = useState<RequestOut[]>([]);

  const { data, isLoading, error } = useReadContract({
    abi: swooshABI.abi,
    address: '0xE0e4f202Ddee2850Ed29E3B7b59Bd205ac107E80',
    functionName: 'getRequestsOut',
    args: [user_address],
    chainId: baseSepolia.id,
  });

  useEffect(() => {
    if (data != null) {
      const typedData = data as RequestOut[]; // Cast the data to the correct type
      setResult(typedData);
      console.log(typedData);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex w-full justify-evenly ">
      <Group type="In" />
      <Group type="Out" />
    </div>
  );
};

export default HomeGroup;
