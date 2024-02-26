import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { AccountDropdown } from './AccountDropdown';
import { AccountInfoPanel } from './AccountInfoPanel';

/**
 * AccountConnect
 *  - Connects to the wallet
 *  - Disconnects from the wallet
 *  - Displays the wallet network
 */
function AccountConnect() {
  const router = useRouter();

  const redirectToAnotherPage = () => {
    // Check if running in the client-side environment
    if (typeof window !== 'undefined') {
      // Redirect to the desired page after successful authentication
      router.push('/home');
    }
  };

  return (
    <ConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            className="flex flex-grow"
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="inline-flex flex-grow items-center justify-center gap-2 rounded-3xl bg-white px-4 py-4"
                  >
                    <div className=" text-lg font-medium leading-normal text-black">
                      Connect wallet
                    </div>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              // Redirect if connected
              // if (connected) {
              //   console.log('you are logged in');
              //   redirectToAnotherPage();
              // }

              return (
                <>
                  <div className="flex flex-grow flex-col md:hidden">
                    <AccountInfoPanel />
                  </div>
                  <div className="flex hidden md:block">
                    <AccountDropdown />
                  </div>
                </>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default AccountConnect;
