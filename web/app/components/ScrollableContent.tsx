import React from 'react'

interface ScrollableContentProps {
    children: React.ReactNode
}

const ScrollableContent: React.FC<ScrollableContentProps> = ({children}) => {
    return (
      <div className="max-h-[800px] w-full overflow-y-hidden
      [&::-webkit-scrollbar]:w-4
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        <div>
        {children}
        </div>
      </div>
    )
  }

export default ScrollableContent