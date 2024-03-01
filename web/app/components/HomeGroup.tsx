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

interface HomeGroupProp {
  inNumber: number;
  outNumber: number;
}

const HomeCard = (props: HomeCardProps) => {
  return (
    <div className="w-full rounded-lg bg-gray px-8 py-8 text-lg">
      <p>Swoosh</p>
      <p className="text-4xl font-semibold">{props.type}</p>
      <p className="py-6 text-6xl font-semibold">{props.num}</p>
      <Button variant="Custom" title="View All →" href=""></Button>
    </div>
  );
};


const HomeGroup = (props: HomeGroupProp) => {
  return (
    <div className="flex w-full justify-evenly gap-4">
      <Link href="/requests_in" className="w-full no-underline">
        <HomeCard type="In" num={props.inNumber} />
      </Link>
      <Link href="/requests_out" className="w-full no-underline">
        <HomeCard type="Out" num={props.outNumber} />
      </Link>
    </div>
  );
};

export default HomeGroup;
