import * as React from 'react'
import { 
  type BaseError, 
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from '../../../contracts/out/Swoosh.sol/Swoosh.json';
 
export function DepositERC20() {
  const { 
    data: hash,
    error, 
    isPending, 
    writeContract 
  } = useWriteContract() 

  async function submit(e: React.FormEvent<HTMLFormElement>) { 
    e.preventDefault() 
    const formData = new FormData(e.target as HTMLFormElement) 
    const value = formData.get('value') as string 
    writeContract({
      address: '0x39A23022abF01500ae70B0c1774D41525A266c0C',
      abi,
      functionName: 'deposit',
      args: [parseFloat(value) * 10 ** 18],
    })
  } 

  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({ 
      hash, 
    }) 

  return (
    <form onSubmit={submit}>
      <input name="value" placeholder="300" required className="w-32 rounded-lg bg-gray p-6 text-center text-4xl text-black h-6" />
      <button className="btn-primary btn flex-1 text-white w-32 h-6" type="submit">{isPending ? 'Confirming...' : 'Deposit'} 
    </button>

      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && ( 
        <div>Error: {(error as BaseError).shortMessage || error.message}</div> 
      )} 
    </form>
  )
}