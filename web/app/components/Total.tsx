'use client';
import ProgressBar from './ProgressBar';
import icon from './assets/USDC.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TotalProps {
  price: number;
}

export default function Total(props: TotalProps) {
  return (
    <div className="">
      <div
        className="rounded-swooshBR flex flex-col gap-8 px-6 py-8"
        style={{
          background: 'rgba(199, 255, 254, 0.75)',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          WebkitBackdropFilter: 'blur(10px)' /* Note the capitalization for Webkit */,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(199, 255, 254, 1)',
        }}
      >
        <div className="flex items-center ">
          <motion.div animate={{ scaleX: [0, 1, 0, 1] }}>
            <Image src={icon} alt="USDC icon" width={50} height={50} />
          </motion.div>
          <div className="px-4 text-4xl font-semibold">${props.price} USDC</div>
        </div>
        <ProgressBar percent={75} />
      </div>
    </div>
  );
}
