import * as React from 'react'
import { 
  type BaseError, 
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
 
export function DepositERC20() {

    const { contract } = useContract('0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6');
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "deposit",
  );
  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const value = formData.get('value') as string 
    mutateAsync({args: [value + "000000000000000000"]});
  } 
  return ( 
    <div>
    <form onSubmit={submit} className="flex justify-center">
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

  )
}               