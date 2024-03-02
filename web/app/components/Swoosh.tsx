import Link from 'next/link';
import SwooshProgressBar from './SwooshProgressBar';
import { GoArrowRight } from "react-icons/go";
import {Button} from './Button';

type Props = {
  percent: number;
  title: string;
  href: string;
  variant?: "progress bar" | "button";
  amount?: number
  onClick?: () => void;
  args?: {},
  img?: string

};

export default function Swoosh({
  percent=0,
  title,
  href = "/",
  variant = "progress bar",
  amount,
  img,
  onClick
}: Props) {

  return (
    <Link className='flex flex-col items-center h-36 bg-gray justify-center rounded-swooshBR no-underline w-full h-full py-4' href={href}>
      <div className='flex w-full justify-between px-4 align-center pb-10'>
        <p className=" text-lg text-semibold w-full font-Inter text-swooshText">{title}</p>
        <div>
          <GoArrowRight className="text-3xl"/>
        </div> 
      </div>
      <div className="w-4/5">
        {variant === "progress bar" && (
          <SwooshProgressBar percent={percent}/>
        )}
        {variant === "button" && (
          <Button onClick={onClick} variant={'Custom'} href={''} title={amount == -1 ? 'Confirming' : `Pay $${amount}`} args={{request_id:""}} />
        )}
      </div>
    </Link>
  );
}