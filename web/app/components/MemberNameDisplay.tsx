import React from 'react'
import { Address } from 'viem'

interface MemberNameDisplayProps {
  index: number;
  addr: Address;
  setMembers: Function;
  members: Address[];
}

const MemberNameDisplay:React.FC<MemberNameDisplayProps> = ({index, addr, members, setMembers}) => {

  const removeMember = () => {
    
  }

  return (
    
  )
}

export default MemberNameDisplay