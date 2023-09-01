import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdShoppingBasket,
  MdAccountCircle,
  MdAdd,
  MdLogout,
} from "react-icons/md";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { app } from "../firebase.config";

import Avatar from "../img/avatar.png";
import FB from "../img/FoodBase2.png";
import { useStateValue } from "@component/context/StateProvider";
import { actionType } from "@component/context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const loginMobile = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
    
  };

  const popUpSignIn = async () => {
    if (!user) {
      signInWithPopup(firebaseAuth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const kullanici = result.user;
          console.log('Kullanici Bilgileri: ', kullanici);
          dispatch({
            type: actionType.SET_USER,
            user: kullanici.providerData[0],
          });
          localStorage.setItem("user", JSON.stringify(kullanici.providerData[0]));
        }).catch((error) => {
          console.log(error)
        });
    } else {
      setIsMenu(!isMenu);
    }
  }

  const logoutHandler = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed top-0 z-50 w-screen p-3 px-4 md:p-6 md:px-16 backdrop-blur-lg shadow-lg">
      {/* desktop */}
      <div className="hidden md:flex w-full items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={FB}
            width={200}
            height={200}
            alt="logo"
            className="w-16 object-cover drop-shadow-md"
            id="rsm"
          />
          <p className="text-headingColor text-xl font-[700]">FoodBase</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 font-[500]"
          >
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              <Link href={"/"} className="">
                Home
              </Link>
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              <Link href={"/#groceries"} className="">
                Groceries
              </Link>
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              <Link href={"/#menu"} className="">
                Menu
              </Link>
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              {user ? "DOLU" : "BOŞ"}
            </li>
          </motion.ul>

          <motion.div
            whileTap={{ scale: 0.6 }}
            className="relative hover:cursor-pointer"
            onClick={showCart}
          >
            <MdShoppingBasket size={25} className="text-textColor" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg border-2 border-slate-300 flex items-center justify-center">
                <p className="text-xs text-white font-semibold select-none">
                  {cartItems.length}
                </p>
              </div>
            )}
          </motion.div>

          <div className="relative">
            <motion.div onClick={popUpSignIn} whileTap={{ scale: 0.6 }}>
              {user ? (
                <Image
                  src={user ? user.photoURL : Avatar}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-md rounded-full"
                  alt="user"
                  width={100}
                  height={100}
                  id="rsm"
                />
              ) : (
                <MdAccountCircle className="text-headingColor" size={40} />
              )}
            </motion.div>
            {isMenu && (
              <motion.div
                initial={{ opacity: 0.5, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                className="w-40 bg-primary shadow-xl rounded-lg flex flex-col absolute top-12 right-0 overflow-hidden"
              >
                {user && user.email === "bitterkofte@gmail.com" && (
                  <Link href="/newitem" onClick={() => setIsMenu(false)}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                      <MdAdd />
                      New Item
                    </p>
                  </Link>
                )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logoutHandler}
                >
                  <MdLogout />
                  Log Out
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={FB} alt="logo" className="w-8 object-cover" id="rsm" />
          <p className="text-headingColor text-xl font-[700]">FoodBase</p>
        </Link>

        <div className="flex items-center gap-5">
          <div className="relative" onClick={showCart}>
            <MdShoppingBasket size={25} className="text-textColor" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg border-2 border-slate-300 flex items-center justify-center">
                <p className="text-xs text-white font-semibold select-none">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.div onClick={loginMobile} whileTap={{ scale: 0.6 }}>
              {user ? (
                <Image
                  src={user ? user.photoURL : Avatar}
                  className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-md rounded-full"
                  alt="user"
                  width={100}
                  height={100}
                  id="rsm"
                />
              ) : (
                <MdAccountCircle className="text-headingColor" size={40} />
              )}
            </motion.div>
            {isMenu && (
              <motion.div
                initial={{ opacity: 0.5, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2 }}
                className="w-40 bg-primary shadow-md rounded-lg flex  flex-col absolute top-12 right-0 overflow-hidden"
              >
                {user && user.email === "bitterkofte@gmail.com" && (
                  <Link href="/newitem" onClick={() => setIsMenu(false)}>
                    <p className="m-2 p-2 bg-blue-400 rounded-md shadow-md flex items-center justify-center gap-3 hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                      <MdAdd />
                      New Item
                    </p>
                  </Link>
                )}
                <ul className="flex items-center flex-col">
                  <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                    Home
                  </li>
                  <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                    Menu
                  </li>
                  <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                    About Us
                  </li>
                  <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                    {user ? "DOLU" : "BOŞ"}
                  </li>
                </ul>
                <p
                  className="m-2 p-2 bg-red-400 rounded-md shadow-md flex items-center justify-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logoutHandler}
                >
                  <MdLogout />
                  Log Out
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
