import SwooshImage from './SwooshImage';

type Props = {
  img: string;
  percent: number;
  title: string;
};

export default function Swoosh({
  img,
  percent,
  title,
}: Props) {
  return (
    <div className='w-24'>
      <SwooshImage img={img} percent={percent} />
      <p className="text-center pt-2 w-full font-Inter text-swooshText">{title}</p>
    </div>
  );
}
