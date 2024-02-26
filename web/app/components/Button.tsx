type Props = {
    title: string;
    href: string;
    // primary = Deposit/Withdraw
    // secondary = 
    variant?: 'primary' | 'secondary' | '3', 
  };
  
  export default function Button({ 
    title, 
    variant,
    href,
}: Props) {
    return (
      <div className="relative">  
        <div className="absolute left-0 top-0 rounded-full w-full bg-blue-200"> 
            <p>{title}</p>
        </div>
      </div>
    );
  }
  