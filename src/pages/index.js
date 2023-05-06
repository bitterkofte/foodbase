import Image from 'next/image'
import Header from '@component/components/Header'
import { AnimatePresence } from "framer-motion"
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <AnimatePresence>
      <div className='w-screen h-auto flex flex-col bg-primary'>
        <Header />

        <main className='mt-24 p-8 w-full'>Maincontainer</main>
        <div className='p-4'>User Info:{}</div>
      </div>
    </AnimatePresence>
  )
}
