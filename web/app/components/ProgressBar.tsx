type Props = {
  percent: number;
};

export default function ProgressBar({ percent }: Props) {
  return (
    <div className="relative ">
      {/* Container div representing the complete bar */}
      <div className="relative h-8 rounded-full  bg-blue-200 opacity-50"></div>

      {/* Filled portion of the bar */}
      <div
        className="absolute left-0 top-0 rounded-full  bg-gradient-to-r from-blue-300 to-blue-200"
        style={{ width: `${percent}%`, height: '100%' }}
      />
    </div>
  );
}
