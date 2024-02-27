'use client';
import TotalProgressBar from './TotalProgressBar';
import icon from '../assets/USDC.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TotalProps {
  price: number;
  percent?: number;
}

export default function Total(props: TotalProps) {
  return (
    <div className="">
      <div className="rounded-swooshBR flex flex-col gap-8 px-6 py-6 bg-gray">
        <div className="flex items-center ">
          <motion.div animate={{ scaleX: [0, 1, 0, 1] }}>
            <Image src={icon} alt="USDC icon" width={50} height={50} />
          </motion.div>
          <div className="px-4 text-4xl font-semibold">${props.price}</div>
        </div>
        <TotalProgressBar percent={props.percent as number} />
      </div>
    </div>
  );
}
