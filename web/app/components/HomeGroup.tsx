import Link from 'next/link';
import { Button } from './Button';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";


export interface RequestOut {
  id: string;
  creditor: string;
  debtors: string[];
  paid: any[]; // Adjust the type according to what `paid` actually contains
  declined: any[]; // Same here, adjust the type as necessary
  amount: string;
  message: string;
  imageURI: string;
  timestamp: string;
  fulfilled: boolean;
  cancelled: boolean;
}
interface HomeCardProps {
  type: string;
  num: number;
}

interface PercentPaidCardProps {
  percent: number;
}

interface HomeGroupProp {
  inNumber: number;
  outNumber: number;
  percentPaid: number;
}

const HomeCard = (props: HomeCardProps) => {
  return (
    <div className="w-full rounded-lg bg-gray px-2 py-4 text-center outline outline-blue-700">
      <div className='w-full flex justify-center py-2'>
        {props.type == "In" ? <FaArrowDown size={30} /> : <FaArrowUp size={30} />}
      </div>
      <p className='text-xl font-bold'>Swoosh {props.type}</p>
      <p className='text-sm py-2'>{props.type == "In" ? "Incoming" : "Outgoing"} Requests</p>
      <p className="py-2 text-6xl font-semibold">{props.num}</p>
      <Button variant="Custom" title="View All" href=""></Button>
    </div>
  );
};

const PercentPaidCard = (props: PercentPaidCardProps) => {
  const percent = props.percent !== undefined ? props.percent : 100;
  return (
    <div className="w-2/3 h-full rounded-lg scale-150 p-4 m-5 mt-10 text-lg text-center ">
      <p>Requests Completed</p>
      <div className="radial-progress w-50 h-50" style={{"--value":percent}} role="progressbar">{percent}%</div>
    </div>
  );
};


const HomeGroup = (props: HomeGroupProp) => {
  return (
    <div className="flex flex-wrap w-full justify-evenly py-6 my-6 overflow-y-auto">
      <Link href="/requests_in" className="w-5/12 no-underline">
        <HomeCard type="In" num={props.inNumber} />
      </Link>
      <Link href="/requests_out" className="w-5/12 no-underline">
        <HomeCard type="Out" num={props.outNumber} />
      </Link>
      <PercentPaidCard percent={props.percentPaid}/>
    </div>
  ); 
};
 
export default HomeGroup;