import AccountConnect from '@/components/layout/header/AccountConnect';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConnectWallet, useAddress, useContract, useUser, useContractWrite, useContractRead} from "@thirdweb-dev/react";
export default function SignInPage() {
  const { contract } = useContract('0x42f243d53e2368A8e6d3C8E1eA97dBC7889377f1');
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
    contract?.call("allowance", [address, "0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6"]).then((data)=> {
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
      <div className="w-64 ">
      <ConnectWallet />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={()=>{mutateAsync({args:["0x3FAb56c7E446777ee1045C5a9B6D7BdA23a82bD6", "100000000000000000000000000000"]})}}>Approve USDC</button>
      </div>
    </div>
  );   
}