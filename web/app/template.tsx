"use client"
import React from 'react'
import {motion} from 'framer-motion'

const Template = ({children}:{ children: React.ReactNode }) => {
  return <motion.div>{children}</motion.div>
}

export default Template