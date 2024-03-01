type Props = {
    percent: number;
  };
  
  export default function SwooshProgressBar({
    percent,
  }: Props) {
    return (
    <div className ="relative rounded-full">
        {/* Container div representing the complete bar */}
        <div className="relative h-8 bg-blue-200 opacity-50 rounded-swooshPB"></div>
  
        {/* Filled portion of the bar */}
        <div
            className="absolute top-0 left-0 bg-blue-200 rounded-swooshPB"
            style={{ width: `${percent}%`, height: '100%' }}
        />
    </div>
    );
  }
  