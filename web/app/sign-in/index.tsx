import AccountConnect from '@/components/layout/header/AccountConnect';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectWallet, useAddress, useContract, useContractWrite, useContractRead} from "@thirdweb-dev/react";

export default function SignInPage() {
  const router = useRouter();
  const address = useAddress();
  const { contract } = useContract(process.env.ERC20_ADDRESS); 
  const { mutateAsync, isLoading: approve_isLoading, error: approve_error } = useContractWrite(
    contract,
    "approve",
  );
  const {data, isLoading: allowance_isLoading, error: allowance_error} = useContractRead(contract,'allowance',[address, process.env.CONTRACT_ADDRESS])

  const handleApprove = () => {
    mutateAsync({args:[process.env.CONTRACT_ADDRESS, "10000000000000000000000"]}).then(data=>{
      if (address != null && contract != null && data.receipt != undefined) {  
        router.push('/home');
      }
    })
  }

  return (  
    <div className="  flex h-screen flex-col items-center justify-center ">
      <h1 className=" mb-32 text-6xl tracking-widest text-blue-100 ">SWOOSH</h1>
        <div className="w-64 flex flex-col justify-center gap-2 ">
        <ConnectWallet  modalSize='wide' hideSwitchToPersonalWallet={true} hideSendButton={true} hideReceiveButton={true}/>
        {(address != null) ?  <button className="  btn btn-square btn-primary bg-blue-100 text-blue-300 btn-wide" disabled={approve_isLoading} onClick={handleApprove}> {approve_isLoading ?   <span className="loading loading-spinner"/> :"Approve USDC"}</button> : null}
      </div>
    </div>
  );   
}


