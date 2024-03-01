import React, {useEffect, useState} from 'react'
import { readSwooshContract } from 'app/util';
import { useAccount } from 'wagmi';
import { Button } from './Button';
import { DepositERC20 } from 'app/components/deposit';
import { WithdrawERC20 } from 'app/components/Withdraw';
import { useAddress, useContract } from '@thirdweb-dev/react';

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
      contract?.call("getBalance", [user_address]).then((data)=> {
        console.log(data);
        setUserBalance(data);
      });
    }, [])

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
                <div className="modal-box h-1/5 font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
                <form method="dialog " className="flex w-full justify-evenly gap-2">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div className='h-full flex flex-col justify-center'>
                    <DepositERC20/>          
                </div>
                </div>
            </dialog>    
            <dialog id="withdraw_modal" className="modal">
                <div className="modal-box font-Inter w-11/12 max-w-xl bg-blue-300 text-white ">
                <form method="dialog " className="flex w-full justify-evenly gap-2">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                    </form>
                <WithdrawERC20/>          
                </div>
            </dialog>
        </div>
      );
}

export default ProfileBalanceCard