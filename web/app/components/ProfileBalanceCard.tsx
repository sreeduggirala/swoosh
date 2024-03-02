import React, {useEffect, useState} from 'react'
import { readSwooshContract } from 'app/util';
import { useAccount } from 'wagmi';
import { Button } from './Button';
import { useAddress, useContract, useContractWrite, toWei } from '@thirdweb-dev/react';

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
    const [depositValue, setDepositValue] = useState<string>('');
    const [withdrawValue, setWithdrawValue] = useState<string>('');

    // let result = readSwooshContract('getBalance', [user_address], setUserBalance);
    let {contract} = useContract(process.env.CONTRACT_ADDRESS);
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
    const { mutateAsync: depositMutateAsync, isLoading: depositIsLoading, error: depositError } = useContractWrite(
      contract,
      "deposit",
    );
    async function submitDeposit() { 
      const value = parseFloat(depositValue)
      depositMutateAsync({args: [toWei(value)]});  
      setDepositValue('');
      const modal = document.getElementById('deposit_modal') as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
    } 
    // deposit form END

    // withdraw form START
    const { mutateAsync: withdrawMutateAsync, isLoading: withdrawIsLoading, error: withdrawError } = useContractWrite(
      contract,
      "withdraw",
    );
    async function submitWithdraw() { 
      const value = parseFloat(withdrawValue)
      withdrawMutateAsync({args: [toWei(value)]});
      setWithdrawValue('');
      const modal = document.getElementById('withdraw_modal') as HTMLDialogElement | null;
      if (modal) {
          modal.close();
      }
    } 
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
                <div>
                  <div className="flex w-full justify-center py-4">
                    <input name="value" placeholder="300" className="w-32 rounded-lg bg-gray p-6 text-center text-4xl text-black h-6 justify-center" onChange={e => setDepositValue(e.target.value)} />
                  </div>
                  <div className="flex flex-row justify-evenly gap-4 pt-6">
                    <Button href={''} title="Cancel" variant={'Custom'} onClick={() => document.getElementById('deposit_modal').close()}/>
                    <Button href={''} title="Confirm" variant={'Custom'} onClick={() => {submitDeposit()}}></Button>
                  </div>
                </div>
                <p>
                  {depositIsLoading && <p>Waiting for confirmation...</p>} 
                  {depositIsLoading && <p>Transaction confirmed.</p>} 
                  {depositError ?
                    <p>Error</p>  : null
                  } 
                </p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <dialog id="withdraw_modal" className="modal">
              <div className="modal-box h-1/4 md:h-1/3 font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
                <p className="font-Inter text-center font-semibold text-white pb-4">Withdraw USDC</p>
                <div>
                  <div className="flex w-full justify-center py-4">
                    <input name="value" placeholder="300" className="w-32 rounded-lg bg-gray p-6 text-center text-4xl text-black h-6 justify-center" onChange={e => setWithdrawValue(e.target.value)} />
                  </div>
                  <div className="flex flex-row justify-evenly gap-4 pt-6">
                    <Button href={''} title="Cancel" variant={'Custom'} onClick={() => document.getElementById('withdraw_modal').close()}/>
                    <Button href={''} title="Confirm" variant={'Custom'} onClick={() => submitWithdraw()}></Button>
                  </div>
                </div>
                <p>
                  {withdrawIsLoading && <p>Waiting for confirmation...</p>} 
                  {withdrawIsLoading && <p>Transaction confirmed.</p>} 
                  {withdrawError ?
                    <p>Error</p>  : null
                  } 
                </p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog> 
        </div>
      );
}

export default ProfileBalanceCard