import { useCallback } from 'react';
import { Avatar, Name } from '@coinbase/onchainkit';
import { ExitIcon } from '@radix-ui/react-icons';
import { useAccount, useDisconnect } from 'wagmi';
import { getSlicedAddress } from '@/utils/address';
import { useAddress } from '@thirdweb-dev/react';
  
export function AccountInfoPanel() {
  const address = useAddress();
  const { disconnect } = useDisconnect();
  const handleDisconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  if (!address) return null;

  return (
    <>
      <div className="my-4 inline-flex items-center justify-start gap-4">
        <Avatar address={`0x${address.slice(2)}`} className="h-10 w-10 rounded-full" />
        <div className="inline-flex flex-col items-start justify-center gap-1">
          <div className="font-inter w-32 text-base font-medium text-white">
            <Name address={`0x${address.slice(2)}`} />
          </div>
          <span className="font-inter w-32 text-sm font-medium text-zinc-400">
            {getSlicedAddress(`0x${address.slice(2)}`)}
          </span>
        </div>
      </div>
      <hr className="h-px self-stretch border-transparent bg-zinc-400 bg-opacity-20" />
      <div className="flex justify-center">
        <button
          type="button"
          aria-label="Disconnect"
          className="my-4 inline-flex items-center justify-between self-stretch"
          onClick={handleDisconnectWallet}
        >
          <span className="font-inter w-32 text-left text-base font-medium text-white">
            Log out
          </span>
          <ExitIcon className="relative h-4 w-4 text-white" />
        </button>
      </div>
    </>
  );
}
