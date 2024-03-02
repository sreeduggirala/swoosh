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
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

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
    useEffect(()=> {
      if (!depositIsLoading) {
        const modal = document.getElementById('deposit_modal') as HTMLDialogElement | null;
        if (modal && !depositIsLoading) {
          modal.close();
        }
        }
    }, [depositIsLoading]);
    async function submitDeposit() { 
      if (depositValue.trim()  == '') {
        setShowErrorToast(true);
        setTimeout(() => {
          setShowErrorToast(false);
        }, 3000);
        return;
      }
      const value = parseFloat(depositValue)
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      await depositMutateAsync({args: [toWei(value)]});  
      setDepositValue('');
      window.location.reload();
    } 
    // deposit form END

    // withdraw form START
    const { mutateAsync: withdrawMutateAsync, isLoading: withdrawIsLoading, error: withdrawError } = useContractWrite(
      contract,
      "withdraw",
    );
    useEffect(()=> {
      if (!withdrawIsLoading) {
        const modal = document.getElementById('withdraw_modal') as HTMLDialogElement | null;
        if (modal) {
          modal.close();
        }
        }
    }, [withdrawIsLoading]);
    async function submitWithdraw() { 
      if (withdrawValue.trim()  == '') {
        setShowErrorToast(true);
        setTimeout(() => {
          setShowErrorToast(false);
        }, 3000);
        return;
      }
      const value = parseFloat(withdrawValue)
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      await withdrawMutateAsync({args: [toWei(value)]});
      setWithdrawValue('');
      window.location.reload();
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
                    <Button href={''} title={depositIsLoading ? 'Confirming...' : 'Confirm'} variant={'Custom'} onClick={() => {submitDeposit()}}></Button>
                  </div>
                </div>
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
                    <Button href={''} title={withdrawIsLoading ? 'Confirming...' : 'Confirm'} variant={'Custom'} onClick={() => submitWithdraw()}></Button>
                  </div>
                </div>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog> 

            {showSuccessToast && (
              <div className="toast toast-top toast-center">
                <div role="alert" className="alert alert-success">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Transaction sent!</span>
                </div>
              </div>
            )}
            {showErrorToast && (
              <div className="toast toast-top toast-center">
                <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Request failed!</span>
                </div>
              </div>
            )}
            </div>
      );
}

export default ProfileBalanceCard