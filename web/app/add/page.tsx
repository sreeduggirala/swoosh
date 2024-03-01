'use client'

import React, { useEffect, useState } from 'react'
import { 
  type BaseError, 
  useWaitForTransactionReceipt, 
  useAccount,
  useWriteContract 
} from 'wagmi'
import Header from '../components/Header'
import Input from 'app/components/Input'
import AddMembers from 'app/components/AddMembers'
import { abi } from '../../../contracts/out/Swoosh.sol/Swoosh.json';

const Add = () => {

  const [message, setMessage] = useState('');
  const [costStr, setCostStr] = useState('');
  const [members, setMembers] = useState([]);
 
  const { 
    data: hash,
    error,
    isPending, 
    writeContract 
  } = useWriteContract() 

  useEffect(() => {
    console.log(message)
    console.log(costStr)
  }, [message, costStr])

  const writeRequest = async () => {
    var amount = (parseFloat(costStr) / members.length).toFixed(2);
    //todo: add image uri, add error handling
    writeContract({
      address: '0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6',
      abi,
      functionName: 'request',
      args: [members, amount, message, ""],
    })
  }

  async function submit(e: any) { 
    var amount = (parseFloat(costStr) * Math.pow(10, 18) / (members.length+1));
    //todo: add image uri, add error handling
    writeContract({
      address: '0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6',
      abi,
      functionName: 'request',
      args: [members, amount, message, ""],
    })
  } 
  
submit
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
  useWaitForTransactionReceipt({ 
    hash, 
  }) 

  return (
    <div className='flex flex-col px-4 pb-20 max-h-screen'>
      <div className="sticky top-0 z-10 w-full pb-4 max-h-screen">
        <Header title="Make a Swoosh" />
        <div className='flex flex-col space-y-5 w-full h-full rounded-lg bg-gray px-4 py-3'>
          <Input title="Message:" placeholder='Groceries' state={message} setState={setMessage}/> 
          <Input title="Total Cost ($):" placeholder='10.99' state={costStr} setState={setCostStr}/>
          <AddMembers members={members} setMembers={setMembers}/>
        </div>
        <button 
          className="btn btn-primary rounded-full text-white text-2xl w-full mt-4 outline"
          onClick={submit}
        >
{isPending ? 'Confirming...' : 'Sweesh!'}         </button>

<p>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
      </p>
      </div>    
    </div>
  )
}

export default Add

function usePrepareContractWrite(arg0: { address: string; abi: { name: string; type: string; stateMutability: string; inputs: never[]; outputs: never[] }[]; functionName: string }): { config: any } {
  throw new Error('Function not implemented.')
}
