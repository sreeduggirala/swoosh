import Link from 'next/link';
import SwooshProgressBar from './SwooshProgressBar';
import { GoArrowRight } from "react-icons/go";

type Props = {
  percent: number;
  title: string;
  href: string;
};

export default function Swoosh({
  percent,
  title,
  href = "/",
}: Props) {
  return (
    <Link className='flex flex-col items-center w-40 h-36 bg-gray justify-center rounded-swooshBR no-underline w-full' href={href}>
      <div className='flex w-full justify-between px-4 align-center pb-10'>
        <p className=" text-lg text-semibold w-full font-Inter text-swooshText">{title}</p>
        <div><GoArrowRight className="text-3xl"/>
      </div> </div>
      <div className="w-4/5">
        <SwooshProgressBar percent={percent}/>
      </div>
    </Link>
  );
}
