type Props = {
    percent: number;
  };
  
  export default function SwooshProgressBar({
    percent,
  }: Props) {
    return (
    <div className ="relative rounded-full">
        {/* Container div representing the complete bar */}
        <div className="relative h-8 bg-blue-200 opacity-50 rounded-swooshPB"/>
          
  
        {/* Filled portion of the bar */}
        <div
            className="absolute top-0 left-0 bg-blue-200 rounded-swooshPB"
            style={{ width: `${percent}%`, height: '100%' }}>
          {percent > 0 && ( // Conditionally render the percentage text if percent is greater than 0
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                {percent}%
            </div>
          )}
        </div>
    </div>
    );
  }
  