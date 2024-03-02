'use client'
/* global BigInt */
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
import { ThirdwebProvider, smartWallet, useContract, useContractWrite, embeddedWallet, toWei } from '@thirdweb-dev/react'
import Wrapper from './Wrapper'
import { BaseSepoliaTestnet} from '@thirdweb-dev/chains';



const Add = () => {

  const [message, setMessage] = useState('');
  const [costStr, setCostStr] = useState('');
  const [members, setMembers] = useState([]);
  const [isRequesting, setIsRequesting] = useState(true);
  const [payAddress, setPayAddress] = useState('');
  const { contract } = useContract(process.env.CONTRACT_ADDRESS);
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
    alert(amount);
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
      // payMutateAsync({args:[payAddress, toWei(parseFloat(costStr)), message, ""]})
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
    <div>
              <ThirdwebProvider
    activeChain={BaseSepoliaTestnet}
      clientId="3524eeab46d7c262cb23bcf072d92d5e"
      supportedWallets={[
        smartWallet(
          embeddedWallet(), // any personal wallet
          {
            factoryAddress: "0xFB5dA66aE989c5B1926a70107c9c8a75D5e5cEa5", // your deployed factory address
            gasless: true, // enable or disable gasless transactions
          },
        ),
      ]}

    >
      <Wrapper></Wrapper>
      </ThirdwebProvider>
      </div>
    )
}

export default Add;
