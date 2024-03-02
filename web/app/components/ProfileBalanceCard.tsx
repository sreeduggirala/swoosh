import React, {useEffect, useState} from 'react'
import { readSwooshContract } from 'app/util';
import { useAccount } from 'wagmi';
import { Button } from './Button';
import { DepositERC20 } from 'app/components/deposit';
import { WithdrawERC20 } from 'app/components/Withdraw';
import { useAddress, useContract, useContractWrite } from '@thirdweb-dev/react';

function formatNumber(num: number): string {
    if (num < 1000) {
      return num.toFixed(2);
    } else {
      let divisor = 1;
      let unit = '';
  
      if (num >= 1e9) {
        divisor = 1e9;
        unit = 'b';
      } else if (num >= 1e6) {
        divisor = 1e6;    
        unit = 'm';
      } else if (num >= 1e3) {
        divisor = 1e3;
        unit = 'k';
      }
  
      const formattedNumber = (num / divisor).toFixed(1) + unit;
      return formattedNumber;
    }
  }

const ProfileBalanceCard = () => {
    const user_address = useAddress(); 
    const [userBalance, setUserBalance] = useState<number>();
    // let result = readSwooshContract('getBalance', [user_address], setUserBalance);
    let {contract} = useContract("0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6");
    useEffect(() => {
      if (user_address != undefined) {
      contract?.call("getBalance", [user_address]).then((data)=> {
        // alert(data);
        console.log(data);
        setUserBalance(data);
      });
    }
    }, [user_address])

    // deposit form START
    const { mutateAsync, isLoading, error } = useContractWrite(
      contract,
      "deposit",
    );
    async function submitDeposit(e: React.FormEvent<HTMLFormElement>) { 
      e.preventDefault() 
      const formData = new FormData(e.target as HTMLFormElement) 
      const value = formData.get('value') as string 
      mutateAsync({args: [value + "000000000000000000"]});  
      const modal = document.getElementById('deposit_modal') as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
    } 
    // deposit form END

    // withdraw form START
    // const { 
    //   data: hash,
    //   error, 
    //   isPending, 
    //   writeContract 
    // } = useWriteContract() 
  
    // async function submit(e: React.FormEvent<HTMLFormElement>) { 
    //   e.preventDefault() 
    //   const formData = new FormData(e.target as HTMLFormElement) 
    //   const value = formData.get('value') as string 
    //   writeContract({
    //     address: '0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6',
    //     abi,
    //     functionName: 'withdraw',
    //     args: [parseFloat(value) * 10 ** 18],
    //   })
    // } 
    // withdraw form END

    return (
        <div className="flex w-full rounded-lg bg-gray">
          <div className="w-full p-3 px-4">
            <p>Balance</p>  
            <p className="py-4 text-4xl font-semibold">
              ${(userBalance == undefined )? "--":  formatNumber(Number(userBalance) / Math.pow(10, 18))}
            </p>
            <div className="flex justify-center space-x-2">
              <Button
                variant="Deposit"
                href="/"
                onClick={() => document.getElementById('deposit_modal').showModal()}
              />
              <Button
                variant='Withdraw'
                href="/"
                onClick={() => document.getElementById('withdraw_modal').showModal()}
              />
            </div>
          </div>

            <dialog id="deposit_modal" className="modal">
                <div className="modal-box h-1/4 md:h-1/3 font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
                  <p className="font-Inter text-center font-semibold text-white pb-4">Deposit USDC</p>
                  <div className='h-2/5 flex flex-col justify-center'>
                    <div> 
                      <form onSubmit={submitDeposit} className="flex justify-center">
                        <input name="value" placeholder="300" required className="w-32 rounded-lg bg-gray p-6 text-center text-4xl text-black h-6" />
                      </form>
                      <p>
                        {isLoading && <div>Waiting for confirmation...</div>} 
                        {isLoading && <div>Transaction confirmed.</div>} 
                        {error ?
                          <div>Error</div>  : null
                        } 
                      </p>
                    </div>          
                  </div>
                  <div className="flex flex-row justify-evenly gap-4 pt-6">
                    <form method="dialog" className="flex w-full">
                      <Button href={''} title="Cancel" variant={'Custom'}></Button>
                    </form>
                    <form onSubmit={submitDeposit} className="flex w-full">
                      <Button href={''} title="Confirm" variant={'Custom'}></Button>
                    </form>
                  </div>
                </div>
            </dialog>   

            {/* <dialog id="withdraw_modal" className="modal">
                <div className="modal-box h-1/4 md:h-1/3 font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
                  <p className="font-Inter text-center font-semibold text-white pb-4">Withdraw USDC</p>
                  <div className='h-2/5 flex flex-col justify-center'>
                    <div> 
                      <form onSubmit={submitWithdraw} className="flex justify-center">
                        <input name="value" placeholder="300" required className="w-32 rounded-lg bg-gray p-6 text-center text-4xl text-black h-6" />
                      </form>
                      <p>
                        {isLoading && <div>Waiting for confirmation...</div>} 
                        {isLoading && <div>Transaction confirmed.</div>} 
                        {error ?
                          <div>Error</div>  : null
                        } 
                      </p>
                    </div>          
                  </div>
                  <div className="flex flex-row justify-evenly gap-4 pt-6">
                    <form method="dialog" className="flex w-full">
                      <Button href={''} title="Cancel" variant={'Custom'}></Button>
                    </form>
                    <form onSubmit={submitWithdraw} className="flex w-full">
                      <Button href={''} title="Confirm" variant={'Custom'}></Button>
                    </form>
                  </div>
                </div>
            </dialog>   */}

            <dialog id="withdraw_modal" className="modal">
                <div className="modal-box font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
                <form method="dialog" className="flex w-full justify-evenly gap-2">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <WithdrawERC20/>          
                </div>
            </dialog>
        </div>
      );
}

export default ProfileBalanceCard