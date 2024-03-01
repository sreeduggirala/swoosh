import React, { useState } from 'react'
import { 
  type BaseError, 
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from '../../../contracts/out/Swoosh.sol/Swoosh.json';
import { IoPersonAdd } from "react-icons/io5";
import { Address } from 'viem';
import Input from './Input';
import MemberNameDisplay from './MemberNameDisplay';

interface AddMembersProps {
    members: Address[];
    setMembers: Function;
}

const AddMembers: React.FC<AddMembersProps> = ({members, setMembers}) => {

    const [addressToAdd, setAddressToAdd] = useState('');

    const {
        data: hash,
        error,
        isPending,
        writeContract
    } = useWriteContract();

    const addMember = () => {
        //type check to make sure the address is valid (starts with 0x and is 42 characters long)
        setMembers([...members, addressToAdd]);
        setAddressToAdd('');
        document.getElementById('add_member_modal').close()
        // todo: react toast and error handling
        // document.getElementById('input-id').value = '';
    }

  return (
    <div className='pt-4 max-h-[264px] lg:max-h-[84px] overflow-y-auto'>
        <label className="block text-2xl text-blue-900 font-bold mb-2">Members:</label>
        {members.map((member, index) => {
            return (
                <MemberNameDisplay key={index} addr={member}/>
            )
        })}
        <div className='w-full flex justify-center mt-4'>
            <div className=' bg-slate-200 p-3 rounded-full'>
                <IoPersonAdd onClick={() => document.getElementById('add_member_modal').showModal()}  className='cursor-pointer text-3xl '/>
            </div>
        </div>

        <dialog id="add_member_modal" className="modal">
            <div className="modal-box">
                <div className="modal-action">
                    <form method="dialog" className='space-y-5'>
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex flex-col w-full'>
                        <Input title="Address:" placeholder='0x...' state={addressToAdd} setState={setAddressToAdd}/>
                        <button className="btn my-5 btn-success  text-lg" onClick={addMember}>Add Member</button>
                    </div>
                </div>
            </div>
        </dialog>
    </div>
  )
}

export default AddMembers
