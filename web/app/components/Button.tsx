import Link from 'next/link';
import { CiBellOn } from 'react-icons/ci';

type Props = {
  title?: string;
  href: string;
  variant: 'Deposit' | 'Withdraw' | 'View' | 'Pay All' | 'Pending' | 'Nudge' | 'Custom' | 'Swoosh!';
  args?: {},
  onClick?: ()=>void
};

export function Button({
  title,
  variant,
  href = '/',
  args,
  onClick,
}: Props) {
  const buttonClass = variant === 'Pending' ? 'bg-blue-200 opacity-50' : 
                      variant === 'Nudge' ? 'bg-blue-200 w-min': 'bg-blue-200';

  return (
    <button onClick={onClick} className={`${buttonClass} rounded-full w-full hover:scale-105 duration-200`}>
        {variant === 'Nudge' ? (
            <div className="flex items-center text-xl justify-center px-2 py-2">
              <CiBellOn className="text-white" />
            </div>
          ) : variant === 'Custom' ? (
            <p className="font-Inter text-center font-semibold text-white px-4 py-2">
              {title}
            </p>
          ) : (
            <p
              className={`font-Inter text-center font-semibold text-white ${
                variant === 'Deposit' || 
                variant === 'Withdraw' || 
                variant === 'View' || 
                variant === 'Pay All' ? 
                'px-4 py-2' : 'py-1'
              }`}
            >
              {variant}
            </p>
          )}
    </button>
  );
}


export  function Button2({
  title,
  variant,
  href = '/',
  args,
}: Props) {
  const buttonClass = variant === 'Pending' ? 'bg-blue-200 opacity-50' : 
                      variant === 'Nudge' ? 'bg-blue-200 w-min': 'bg-blue-200';

  return (
    <button className={`${buttonClass} rounded-full w-full`}>
      <Link className="no-underline" href={href}>
          {variant === 'Nudge' ? (
            <div className="flex items-center text-xl justify-center px-2 py-2">
              <CiBellOn className="text-white" />
            </div>
          ) : variant === 'Custom' ? (
            <p className="font-Inter text-center font-semibold text-white px-4 py-2">
              {title}
            </p>
          ) : (
            <p
              className={`font-Inter text-center font-semibold text-white ${
                variant === 'Deposit' || 
                variant === 'Withdraw' || 
                variant === 'View' || 
                variant === 'Pay All' ? 
                'px-4 py-2' : 'py-1'
              }`}
            >
              {variant}
            </p>
          )}
      </Link>
    </button>
  );
}
