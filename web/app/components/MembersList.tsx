import React, { useEffect } from 'react';
import {Button} from './Button';
import { useAddress, smartWallet, useContract, useContractWrite, embeddedWallet, toWei } from '@thirdweb-dev/react'
import { Address } from '@thirdweb-dev/react';

interface MembersListProps {
  debtMembers: string[];
  paidMembers: string[];
  total: number;
}
const MembersList = (props: MembersListProps) => {
  // replace with smart contract connection
  
  return (
    <div className="mt-8 flex flex-col gap-2 ">
      {(props.debtMembers != null) ? props.debtMembers.map((i) => (
        <Member
          debtor={i}
          isPending={true}
          amount={parseFloat((props.total / (props.debtMembers.length + props.paidMembers.length)).toFixed(2))}
        />
      )) : <div></div>}
      {
        props.paidMembers != null ? props.paidMembers.map((i) => (
          <Member
            debtor={i}
            isPending={false}
            amount={parseFloat((props.total / (props.debtMembers.length + props.paidMembers.length)).toFixed(2))}
          />
        ))
      
      : <div></div>}
    </div>
  );
};



const formatAddress = (address: string): string => {
  if (address.length > 9) {
    return address.substring(0, 4) + '...' + address.substring(address.length - 2);
  }
  return address;
};


interface MemberProps {
  debtor: string;
  isPending: boolean;
  amount: number;
}

const Member = (props: MemberProps) => {

  const { contract } = useContract(process.env.CONTRACT_ADDRESS);
  const creditor = useAddress();


  useEffect(() => {
    console.log(props);
  }, [])

  let { mutateAsync: nudgeMutateAsync, isLoading, error } = useContractWrite(
    contract,
    "nudge",
  );

  const nudgePerson = async (debtor: string) => {
    nudgeMutateAsync({args:[debtor]});  
  }
  

  return (
    <div className="bg-gray flex items-center justify-between rounded-lg p-4  text-center">
      <div className="flex gap-4">
        <div className="w-20">
          <p className="text-lg font-semibold">{formatAddress(props.debtor)}</p>
        </div>
        {!props.isPending ? null : <Button variant="Nudge" href="/" onClick={() => nudgePerson(props.debtor)} />}
      </div>
      <div className="flex items-center gap-4">
        <p>${props.amount} USDC</p>

        <div
          className={`w-24 rounded-full shadow-md ${
            props.isPending ? 'bg-blue-200 opacity-50' : 'bg-blue-200'
          } p-2 px-4 font-semibold text-white`}
        >
          {props.isPending ? 'Pending' : 'Paid'}
        </div>
      </div>
    </div>
  );
};

export default MembersList;