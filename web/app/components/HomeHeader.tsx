import Image from 'next/image';
import React from 'react';
import profile_icon from '../assets/logo.svg';
import { useAccount } from 'wagmi';
import { useAddress } from '@thirdweb-dev/react';



const HomeHeader = () => {
  //get user address
  const user_address = useAddress();
  let truncated = user_address?.slice(0, 4) + '...' + user_address?.slice(-3);
  return (
    <div className="flex w-full flex-col items-center justify-center py-2">
      <div className='flex justify-center  items-center'>
        <Image
          src={profile_icon}
          width={100}
          height={100}
          alt="profile icon"
          style={{ borderRadius: '1rem' }}
        />
      </div>
      <p className="font-Inter text-5xl  ">
        Hello,
      </p>
      <b className='font-Inter text-5xl '>{user_address != undefined ? truncated : "--"}!</b>
    </div>
  );
};

export default HomeHeader;