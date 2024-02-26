type Props = {
    img: string;
    percent: number;
    href?: string;
    className?: string;
    variant?: 'primary' | 'secondary';
  };
  
  export default function SwooshImage({
    img,
    percent,
  }: Props) {
    return (
      <div className='relative items-center justify-center rounded-swooshBR'>
  
        <img src={`${img}`} alt="Swoosh Image" className="rounded-swooshBR aspect-square"/>
  
        {/* Blue progress bar overlay */}
        <div
          className="absolute top-0 left-0 bg-swooshOverlay opacity-65 rounded-swooshBR"
          style={{ width: `${percent}%`, height: '100%' }}
        />
  
      </div>
    );
  }
  