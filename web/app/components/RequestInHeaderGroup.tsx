import React from 'react'
import { Button } from './Button';


export function formatNumber(num: number): string {
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

  interface RequestInHeaderGroupProp {
    balance: number;
    owed: number;
  }

  const openDepositModal = () => {
    var depositModal = document.getElementById('deposit_modal') as HTMLDialogElement;
    if(depositModal) {
      depositModal.showModal();
    }
  }

  const openWithdrawModal = () => {
    var withdrawModal = document.getElementById('withdraw_modal') as HTMLDialogElement;
    if(withdrawModal) {
      withdrawModal.showModal();
    }
  }
  
  const RequestInHeaderGroup = (props: RequestInHeaderGroupProp) => {
    return (
      <div className="flex w-full rounded-lg bg-gray">
        <div className="w-1/2 p-3 px-4">
          <p>Balance</p>
          <p className="py-4 text-4xl font-semibold">
            ${formatNumber(Number(props.balance) / Math.pow(10, 18))}
          </p>
          <div className="flex justify-center">
            <Button
              variant="Deposit"
              href="/"
              onClick={() => openDepositModal()}
            />
          </div>
        </div>
        <div className="w-1/2 p-3 px-4">
          <p>Owed</p>
          <p className="py-4 text-4xl font-semibold">
            ${formatNumber(Number(props.owed) / Math.pow(10, 18))}
          </p>
          <div className="flex justify-center">
            <Button variant="Withdraw" href="/" onClick={()=> openWithdrawModal()} />
          </div>
        </div>
      </div>
    );
  };

export default RequestInHeaderGroup