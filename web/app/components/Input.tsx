import React from 'react'

interface InputProps {
    title: string;
    placeholder: string;
    state: string;
    setState: Function;
}

const Input: React.FC<InputProps> = ({title, placeholder, state, setState}) => {
  return (
    <div>
        <label className="block text-2xl text-blue-900 font-bold mb-2">{title}</label>
        <input 
            id='input-id'
            className="py-1 px-4  text-2xl text-blue-900 block w-full border-gray-200 rounded-lg outline focus:outline-blue-900 bg-white" 
            placeholder={placeholder}
            onChange={(e) => setState(e.target.value)}
            value={state}
        />
    </div>
  )
}

export default Input