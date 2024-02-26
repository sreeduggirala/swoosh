import SwooshProgressBar from './SwooshProgressBar';
import { GoArrowRight } from "react-icons/go";

type Props = {
  percent: number;
  title: string;
};

export default function Swoosh({
  percent,
  title,
}: Props) {
  return (
    <div className='flex flex-col items-center w-40 h-36 bg-swooshbg justify-center rounded-swooshBR'>
      <div className='flex w-full pb-10'>
        <p className="ml-6 text-md text-bold pt-1 w-full font-Inter text-swooshText">{title}</p>
        <GoArrowRight className="text-3xl mr-1"/>
      </div>
      <div className="w-4/5">
        <SwooshProgressBar percent={percent}/>
      </div>
    </div>
  );
}
