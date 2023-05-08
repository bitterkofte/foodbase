import Image from 'next/image'
import Header from '@component/components/Header'
import { AnimatePresence } from "framer-motion"
import MainContainer from '@component/components/MainContainer'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <AnimatePresence mode='wait'>
      <div className='w-screen h-auto flex flex-col bg-primary'>
        <MainContainer/>
      </div>
    </AnimatePresence>
  )
}
