import * as React from 'react'
import { abi } from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import { useContract, useContractWrite } from '@thirdweb-dev/react';
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
 
export function SwooshConfirm() {

  const { contract } = useContract(process.env.CONTRACT_ADDRESS);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "acceptAll",
  );
    // const { 
    //     data: hash,
    //     error, 
    //     isPending, 
    //     writeContract 
    //   } = useWriteContract() 
    
      async function submit(e: React.FormEvent<HTMLFormElement>) { 
        e.preventDefault() 
        alert(1);
        // const formData = new FormData(e.target as HTMLFormElement) 
        // const value = formData.get('value') as string 
        mutateAsync({
        args:[]
        })
      } 
    
      // const { isLoading: isConfirming, isSuccess: isConfirmed } = 
      //   useWaitForTransactionReceipt({ 
      //     hash, 
      //   }) 
    
  return ( 
    <div> 
    <form onSubmit={submit} className="flex justify-center">
      <p>
        Please confirm that you are trying to pay back all your Swooshes
      </p>
      <button className="btn-primary btn flex-1 text-white w-20 h-10 p-3">Confirm</button>
 
    </form>
   
      </div>

  )
}