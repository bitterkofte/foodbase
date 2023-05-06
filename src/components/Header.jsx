import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {MdShoppingBasket} from 'react-icons/md'
import { motion } from 'framer-motion'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config'

import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { useStateValue } from '@component/context/StateProvider'
import { actionType } from '@component/context/reducer'

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{user}, dispatch] = useStateValue();

  const login = async () => {
    const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type : actionType.SET_USER,
      user : providerData[0]
    });
    if (typeof window !== 'undefined') {
      console.log("OLDU")
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
  }

  return (
    <header className='fixed z-50 w-screen bg-slate-300 p-6 px-16'>

      {/* desktop */}
      <div className='hidden md:flex w-full items-center justify-between'>
        <Link href={'/'} className='flex items-center gap-2'>
          <Image src={Logo} alt="logo" className='w-8 object-cover' />
          <p className='text-headingColor text-xl font-[700]'>FoodBase</p>
        </Link>

        <div className='flex items-center gap-8'>
          <ul className='flex items-center gap-8 font-[500]'>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
            <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>{user ? "DOLU" : "BOŞ"}</li>
          </ul>

          <motion.div whileTap={{ scale: 0.6 }} className='relative'>
            <MdShoppingBasket size={25} className='text-textColor'/>
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg border-2 border-slate-300 flex items-center justify-center'>
              <p className='text-xs text-white font-semibold select-none'>2</p>
            </div>
          </motion.div>

          <div className='relative'>
            <motion.div onClick={login} whileTap={{ scale: 0.6 }}>
              <Image src={user ? user.photoURL : Avatar} className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-md rounded-full' alt='user' width={100} height={100}/>
            </motion.div>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className='flex md:hidden w-full'></div>
      
    </header>
  )
}

export default Header