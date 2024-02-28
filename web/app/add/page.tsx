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
      address: '0x39A23022abF01500ae70B0c1774D41525A266c0C',
      abi,
      functionName: 'request',
      args: [members, amount, message, ""],
    })
  }



  return (
    <div className='flex flex-col px-4 pb-20'>
      <div className="sticky top-0 z-10 w-full pb-4">
        <Header title="Make a Swoosh" />
        <div className='flex flex-col space-y-5 w-full h-full rounded-lg bg-gray px-4 py-3'>
          <Input title="Message:" placeholder='Groceries' state={message} setState={setMessage}/> 
          <Input title="Total Cost ($):" placeholder='10.99' state={costStr} setState={setCostStr}/>
          <AddMembers members={members} setMembers={setMembers}/>
        </div>
        <button 
          className="btn btn-primary rounded-full text-white w-full mt-4 outline"
          onClick={writeRequest}
        >
          Sweesh!
        </button>
      </div>
    </div>
  )
}

export default Add