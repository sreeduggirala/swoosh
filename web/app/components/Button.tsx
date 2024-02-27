import Link from 'next/link';
import { CiBellOn } from 'react-icons/ci';

type Props = {
  title?: string;
  href: string;
  // primary = Deposit/Withdraw/View/Pay All
  // secondary = Pay/Pending/Nudge
  variant?: 'primary' | 'secondary';
  isPending?: boolean;
  isNudge?: boolean;
};

export default function Button({
  title,
  variant,
  href = '/',
  isPending = false,
  isNudge = false,
}: Props) {
  const renderText = !isNudge && (title || (isPending ? 'Pending...' : 'Paid'));

  return (
    <Link className="w-1/4 rounded-full bg-blue-200 no-underline" href={href}>
      {isNudge ? (
        <div className="align-items justify-center text-center">
          <CiBellOn className="text-white" />
        </div>
      ) : (
        <p
          className={`font-Inter text-center font-semibold text-white ${
            variant === 'primary' ? 'px-4 py-2' : variant === 'secondary' ? 'px-6 py-1' : ''
          }`}
        >
          {title ?? (isPending ? 'Pending...' : 'Paid')}
        </p>
      )}
    </Link>
  );
}
