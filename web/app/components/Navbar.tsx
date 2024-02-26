import Link from 'next/link';
import React from 'react';
import { IoHome, IoPersonCircleSharp, IoAddCircle } from 'react-icons/io5';

export default function Navbar() {
  return (
    <div className=" absolute bottom-5 flex h-16 w-full justify-center  ">
      <div
        className="flex w-96 items-center justify-evenly rounded-full  text-blue-200"
        style={{
          background: 'rgba(199, 255, 254, 0.68)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          WebkitBackdropFilter: 'blur(9.6px)' /* Note the capitalization for Webkit */,
          backdropFilter: 'blur(9.6px)',
          border: '1px solid rgba(199, 255, 254, 1)',
        }}
      >
        <button>
          <Link href="/home">
            <IoHome fontSize={42} />
          </Link>
        </button>
        <button>
          <Link href="/add">
            <IoAddCircle color="var(--blue-300)" fontSize={90} />
          </Link>
        </button>
        <button>
          <Link href="/profile">
            <IoPersonCircleSharp fontSize={48} />
          </Link>
        </button>
      </div>
    </div>
  );
}
