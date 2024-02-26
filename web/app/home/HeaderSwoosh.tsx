type Props = {
    img: string;
    percent: number;
    title: string;
  };
  
  export default function Header() {
    return (
      <div className='w-4/5 flex'>
        <p className="text-center text-4xl font-Inter  tracking-[.6em]">SWOOSH</p>
      </div>
    );
  }
  