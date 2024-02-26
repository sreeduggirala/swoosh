import Link from 'next/link';
import React from 'react';
import { IoHome, IoPersonCircleSharp, IoAddCircle } from 'react-icons/io5';
// style={{
//           background: 'rgba(199, 255, 254, 0.75)',
//           borderRadius: '16px',
//           boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
//           WebkitBackdropFilter: 'blur(10px)' /* Note the capitalization for Webkit */,
//           backdropFilter: 'blur(10px)',
//           border: '1px solid rgba(199, 255, 254, 1)',
//         }} 
export default function Navbar() {
  return (
    <div className="absolute inset-x-0 bottom-5 flex h-14 justify-center ">
      <div className="flex min-w-96  items-center justify-evenly rounded-full bg-blue-100  text-blue-200">
      
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
