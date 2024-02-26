import Image from 'next/image';
import React from 'react';
import profile_icon from '../../assets/bored_app_icon.png';



const HomeHeader = () => {
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
        Hello, <span className=" font-semibold">bob.eth</span>
      </p>
    </div>
  );
};

export default HomeHeader;
