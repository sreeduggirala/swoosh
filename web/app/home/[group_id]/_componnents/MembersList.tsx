import React from 'react';

const MembersList = () => {
  // replace with smart contract connection
  const testMembers = ['0x23423423sd', '0xhasohkdfa', 'bob.eth'];
  const testTotal = 22.85;

  return (
    <div className="mt-8 flex flex-col gap-2 px-8">
      <p className=" text-lg">Members</p>
      {testMembers.map((i) => (
        <Member
          address={i}
          isPending={Math.random() > 0.5}
          amount={parseFloat((testTotal / testMembers.length).toFixed(2))}
        />
      ))}
    </div>
  );
};

interface MemberProps {
  address: string;
  isPending: boolean;
  amount: number;
}
const Member = (props: MemberProps) => {
  return (
    <div className="bg-gray flex items-center justify-between rounded-lg p-4  text-center">
      <p className="text-lg font-semibold">{props.address}</p>
      <div className="flex items-center gap-4">
        <p>${props.amount} USDC</p>

        <div
          className={`w-24 rounded-full shadow-md ${
            props.isPending ? 'bg-blue-100' : 'bg-blue-200 text-white'
          } p-2 px-4 font-semibold`}
        >
          {props.isPending ? 'Pending' : 'Paid'}
        </div>
      </div>
    </div>
  );
};

export default MembersList;
