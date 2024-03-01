import Link from 'next/link';
import { Button } from './Button';

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
    <div className="w-full rounded-lg bg-gray px-8 py-4 text-lg">
      <p>Swoosh</p>
      <p className="text-2xl font-semibold">{props.type}</p>
      <p className="py-2 text-4xl font-semibold">{props.num}</p>
      <Button variant="Custom" title="View All" href=""></Button>
    </div>
  );
};

const PercentPaidCard = (props: PercentPaidCardProps) => {
  return (
    <div className="w-full rounded-lg bg-gray px-8 py-8 text-lg">
      <p>% Paid</p>
      <div className="radial-progress" style={{"--value":50}} role="progressbar">{props.percent}%</div>
    </div>
  );
};


const HomeGroup = (props: HomeGroupProp) => {
  return (
    <div className="flex flex-wrap w-full justify-evenly gap-4 overflow-y-auto">
      <Link href="/requests_in" className="w-2/5 no-underline">
        <HomeCard type="In" num={props.inNumber} />
      </Link>
      <Link href="/requests_out" className="w-2/5 no-underline">
        <HomeCard type="Out" num={props.outNumber} />
      </Link>
      <PercentPaidCard percent={props.percentPaid}/>
    </div>
  );
};

export default HomeGroup;
