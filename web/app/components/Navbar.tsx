import Link from 'next/link';
import React from 'react';
import { IoHome, IoPersonCircleSharp, IoAddCircle } from 'react-icons/io5';

export default function Navbar() {
  return (
    <div className="fixed inset-x-0 bottom-5 z-20 flex h-14 justify-center">
      <div className="bg-gray flex min-w-96 px-2 items-center justify-evenly rounded-full outline outline-blue-900  text-blue-200">
        <button className="hover:scale-125 duration-200">
          <Link href="/home">
            <IoHome fontSize={42} />
          </Link>
        </button>
        <button className="hover:scale-125 duration-200">
          <Link href="/add">
            <IoAddCircle className='text-blue-900' fontSize={90} />
          </Link>
        </button>
        <button className="hover:scale-125 duration-200">
          <Link href="/profile">
            <IoPersonCircleSharp fontSize={48} />
          </Link>
        </button>
      </div>
    </div>
  );
}