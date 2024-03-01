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
import { FaPeopleGroup } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { toWei, useContract, useContractWrite } from '@thirdweb-dev/react'




const Wrapper = () => {

  const [message, setMessage] = useState('');
  const [costStr, setCostStr] = useState('');
  const [members, setMembers] = useState([]);
  const [isRequesting, setIsRequesting] = useState(true);
  const [payAddress, setPayAddress] = useState('');
  const { contract } = useContract('0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6');
  let { mutateAsync: depositMutateAsync, isLoading, error } = useContractWrite(
    contract,
    "request",
  );
    // const { 
  //   data: hash,
  //   error,
  //   isPending, 
  //   writeContract 
  // } = useWriteContract() 
  let { mutateAsync: payMutateAsync, isLoading: payIsLoading, error: payError } = useContractWrite(
    contract,
    "pay",
  );
  
    async function submit(e: any) { 
    var amount = toWei((parseFloat(costStr) / (members.length+1)));
        //todo: add image uri, add error handling
    if(isRequesting) {
      depositMutateAsync({args:[members, amount, message, ""]})
      // writeContract({
      //   address: '0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6',
      //   abi,
      //   functionName: 'request',
      //   args: [members, amount, message, ""],
      // })
    } else {
      payMutateAsync({args:[payAddress,  toWei((parseFloat(costStr))) , message, ""]})
      // writeContract({
      //   address: '0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6',
      //   abi,
      //   functionName: 'pay',
      //   args: [payAddress, parseFloat(costStr) * Math.pow(10, 18) , message, ""], 
      // })
    }
  }  
  
// submit
  // const { isLoading: isConfirming, isSuccess: isConfirmed } = 
  // useWaitForTransactionReceipt({ 
  //   hash, 
  // }) 

  return (
    <div className='flex flex-col px-4 pb-20 max-h-screen'>
      <div className="sticky top-0 z-10 w-full pb-4 max-h-screen mb-1"> 
        <Header title="Make a Swoosh" />
        <div className="w-full flex justify-center items-center space-x-3">
          <FaPeopleGroup  className='text-4xl'/>
          <input type="checkbox" className="toggle" onChange={e => setIsRequesting(!e.target.checked)} checked={!isRequesting} />
          <BsPerson  className='text-3xl'/>
        </div>
      </div>   
      {
        isRequesting ? (
          <div className='flex flex-col space-y-5 w-full h-full rounded-lg bg-gray px-4 py-3 max-h-fit'>
            <h1 className='text-3xl text-center font-bold '>Request</h1>
            <Input title="Message:" placeholder='Groceries' state={message} setState={setMessage}/> 
            <Input title="Total Cost ($):" placeholder='10.99' state={costStr} setState={setCostStr}/>
            <AddMembers members={members} setMembers={setMembers}/>
          </div>
        ) : (
          <div className='flex flex-col space-y-5 w-full h-full rounded-lg bg-gray px-4 py-3 max-h-fit'>
            <h1 className='text-3xl text-center font-bold '>Pay</h1>
            <Input title="Message:" placeholder='Groceries' state={message} setState={setMessage}/> 
            <Input title="Total Cost ($):" placeholder='10.99' state={costStr} setState={setCostStr}/>
            <Input title='User Address: ' placeholder='0x...' state={payAddress} setState={setPayAddress} />
          </div>
        )}
      <button 
        className="btn btn-primary rounded-full text-white text-2xl w-full mt-4 outline"
        onClick={submit}
      >
        {isLoading ? 'Confirming...' : 'Sweesh!'}</button>
      <p>
        {/* {hash && <div>Transaction Hash: {hash}</div>} */}
        {/* {isLoading ? <div>Waiting for confirmation...</div> : ""} 
        {!isLoading ? <div>Transaction confirmed.</div> : ""} 
        {error && (  */}
          {/* <div>Errore</div> 
        )}  */}
      </p>
      
      
    </div>
  )
}

export default Wrapper;