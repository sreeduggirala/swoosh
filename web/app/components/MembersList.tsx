import React from 'react';
import Button from './Button';

const MembersList = () => {
  // replace with smart contract connection
  const testMembers = ['0x23423423sd', '0xhasohkdfa', 'bob.eth'];
  const testTotal = 22.85;

  return (
    <div className="mt-8 flex flex-col gap-2 ">
      {testMembers.map((i) => (
        <Member
          address={formatAddress(i)}
          isPending={Math.random() > 0.5}
          amount={parseFloat((testTotal / testMembers.length).toFixed(2))}
        />
      ))}
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
  address: string;
  isPending: boolean;
  amount: number;
}
const Member = (props: MemberProps) => {
  return (
    <div className="bg-gray flex items-center justify-between rounded-lg p-4  text-center">
      <div className="flex gap-4">
        <div className="w-20">
          <p className="text-lg font-semibold">{props.address}</p>
        </div>
        {/* REMOVE NUDGE BUTTON FOR THOSE WHO HAVE PAID ALREADY */}
        <Button variant="Nudge" href="/"/>
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
