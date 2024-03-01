import Image from 'next/image';
import React from 'react';
import profile_icon from '../assets/logo.png';
import { useAccount } from 'wagmi';



const HomeHeader = () => {
  //get user address
  const user_address = String(useAccount().address);
  let truncated = user_address?.slice(0, 4) + '...' + user_address?.slice(-3);
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-12">
      <Image
        src={profile_icon}
        width={150}
        height={150}
        alt="profile icon"
        style={{ borderRadius: '1rem' }}
      />
      <p className="font-Inter text-5xl ">
        Hello, {truncated}<span className=" font-semibold"></span>
      </p>
    </div>
  );
};

export default HomeHeader;
