import AccountConnect from '@/components/layout/header/AccountConnect';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectWallet, useAddress, useContract, useUser, useContractWrite, useContractRead} from "@thirdweb-dev/react";
export default function SignInPage() {
  const { contract } = useContract(process.env.ERC20_ADDRESS);
  const { mutateAsync, isLoading, error } = useContractWrite(
    contract,
    "approve",
  );
  const [approved, useApproved] = useState(false);


  const redirectToHomePage = () => {
    const router = useRouter();
    // Check if running in the client-side environment
    if (typeof window !== 'undefined') {
      // Redirect to the desired page after successful authentication
      router.push('/home');
    }
  }; 
  

  if (approved) {
    redirectToHomePage();
  }
  
  const address = useAddress();
  // Redirect if connected
  console.log(address);
  if (address != null) { 
    contract?.call("allowance", [address, process.env.CONTRACT_ADDRESS]).then((data)=> {
      // if (data)
      console.log('data : ');
      console.log(data);
      if (data > 0) {
        useApproved(true);
      }
    });



  }



  return (  
    <div className="  flex h-screen flex-col items-center justify-center ">
      <h1 className=" mb-32 text-6xl tracking-widest text-blue-100 ">SWOOSH</h1>
        <div className="w-64 flex flex-col justify-center ">
        <ConnectWallet />
        {(!approved && address != null) ? <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4" onClick={()=>{mutateAsync({args:[process.env.CONTRACT_ADDRESS, "100000000000000000000000000000"]})}}>Approve USDC</button> : null}
      </div>
    </div>
  );   
}