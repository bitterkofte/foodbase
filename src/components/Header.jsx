import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdShoppingBasket,
  MdAccountCircle,
  MdAdd,
  MdLogout,
  MdSearch,
  MdClose,
} from "react-icons/md";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import { app } from "../firebase.config";

import Avatar from "../img/avatar.png";
import FB from "../img/FoodBase2.png";
import { useStateValue } from "@component/context/StateProvider";
import { actionType } from "@component/context/reducer";
import ProductCard from "./ProductCard";
import Plate from "../img/plate.png";


const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const firebaseAuth = getAuth(app);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [isMenu, setIsMenu] = useState(false);
  const [{ user, foodItems, cartShow, cartItems }, dispatch] = useStateValue();
  const data = foodItems?.filter(f => f.title.toLowerCase().includes(searchValue.toLowerCase()));
  const [items, setItems] = useState([]);
  const searchRef = useRef();

  const increase = (item) => {
    const found = cartItems.find((i) => i.title === item.title);
    if (found) {
      item.qty += 1;
    } else {
      setItems([...cartItems, item]);
    }
  };
  const addtocart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    if(items !== []) localStorage.setItem("cartItems", JSON.stringify(items));
  };
  useEffect(() => {
    if(items !== []) addtocart();
    // setActivateSepet(false);
    // console.log("Urun : ", items);
    // console.log("CART_ITEMS : ", cartItems);
  }, [items]);

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
          // console.log('Kullanici Bilgileri: ', kullanici);
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

  const closeSearching = () => {
    setSearchValue("");
    setIsSearchActive(false);
    searchRef.current.blur();
  }

  useEffect(() => {
    if (isSearchActive) {
      // Disable scrolling on the background page
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling on the background page
      document.body.style.overflow = 'auto';
    }

    return () => {
      // Re-enable scrolling when the overlay is unmounted (cleanup)
      document.body.style.overflow = 'auto';
    };
  }, [isSearchActive]);

  // useEffect(() => {
  //   // console.log("YEREL: ",localStorage.getItem('cartItems'));
  //   // console.log("PARSE: ",JSON.parse(localStorage.getItem('cartItems')));

  //   dispatch({
  //     type: actionType.SET_CART_ITEMS,
  //     cartItems: JSON.parse(localStorage.getItem('Sepettekiler')),
  //   });
  // }, [])
  

  return (
    <div className=''>
    <header className={`${isSearchActive ? "bg-headerColor" : ""} fixed top-0 z-50 w-screen p-3 px-4 lg:p-6 md:px-16 backdrop-blur-lg shadow-lg`}>
      {/* SECTION desktop */}
      <div className="hidden lg:flex w-full items-center justify-between">
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
            <li className={`flex items-center px-2 text-base text-headingColor border-2 rounded-full border-neutral-500 ${isSearchActive ? "bg-inputColor border-orange-500" : ""} transition-all duration-300`}>
              <input ref={searchRef} className="text-sm py-1 px-2 bg-transparent border-none outline-none" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onClick={() => setIsSearchActive(true)} onKeyDown={(e) => e.key === "Escape" && closeSearching() } />
              {isSearchActive ? <MdClose className="hover:text-red-600 hover:scale-125 transition-all cursor-pointer" onClick={closeSearching} /> : <MdSearch className="hover:text-orange-600 hover:scale-125 transition-all cursor-pointer" onClick={() => setIsSearchActive(true)}/>}
            </li>
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
              <Link href={"/about"} className="">
                About
              </Link> 
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

      {/* SECTION mobile */}
      <div className="flex items-center justify-between lg:hidden w-full">
        {!isSearchActive ? 
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={FB} alt="logo" className="w-8 object-cover" id="rsm" />
          <p className="text-headingColor text-xl font-[700]">FoodBase</p>
        </Link>
        :
        <div className='flex items-center px-2 text-base text-headingColor border-2 rounded-full border-neutral-500 duration-100'>
          <input className="max-w-[180px] text-sm py-1 px-2 bg-transparent border-none outline-none" type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <MdClose className="text-red-600 transition-all" onClick={closeSearching} /> 
        </div>
        }

        <div className="flex items-center gap-5">
          <div className=''>
            {!isSearchActive && 
              <MdSearch size={25} className="text-textColor" onClick={() => setIsSearchActive(true)} />
            }
          </div>

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
                  <Link href={"/"} >
                    <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                      Home
                    </li>
                  </Link>
                  <Link href={"/#menu"} >
                    <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                      Menu
                    </li>
                    </Link>
                  <Link href={"/#about"} >
                    <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                      About Us
                    </li>
                  </Link>
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

    {/* SECTION Filtered Products */}
    {isSearchActive &&
    // <div className='fixed top-0 left-0 z-[3] bg-modalColor'></div>
    <div className='fixed top-0 left-0 w-full h-full z-[4] py-20 sm:py-24 md:py-28 lg:py-32 px-24 flex flex-wrap  justify-start gap-4 overflow-y-scroll bg-modalColor backdrop-blur-sm'>
      {data && data.length > 0 ? (
        data.map((item) => <ProductCard key={item.key} item={item} items={items} setItems={setItems} increase={increase} />)
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <Image
            src={Plate}
            className="h-150 object-contain grayscale"
            width={300}
            height={300}
            alt="not-found"
            id="rsm"
          />
          <p className="text-xl text-center text-gray-400 font-semibold my-5 grayscale select-none">
            We could not find any related product. 😔
          </p>
        </div>
      )}
    </div>

    }
    </div>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
