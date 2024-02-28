import React from 'react'
import { Address } from 'viem'

interface MemberNameDisplayProps {
    addr: Address;
}

const MemberNameDisplay:React.FC<MemberNameDisplayProps> = ({addr}) => {
  return (
    <div className=' w-full bg-white rounded-full outline my-2 p-2 truncate'>
        {addr}
    </div>
  )
}

export default MemberNameDisplay