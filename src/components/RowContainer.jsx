import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "@component/context/StateProvider";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdShoppingBasket, MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";
import Plate from "../img/plate.png";
import { actionType } from "@component/context/reducer";
import ScrollContainer from "react-indiana-drag-scroll";
// import { useRouter } from "next/router";
import ProductCard from "./ProductCard";

const RowContainer = ({ flag, data }) => {
  // const rowContainer = useRef();
  const [items, setItems] = useState([]);
  const [{ cartItems, sepet }, dispatch] = useStateValue();


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

  return (
    <section className='w-full my-0 overflow-auto'>
      {/* <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & healthy foods
          </p>
      </div> */}
    <ScrollContainer className="w-full flex items-center gap-3 my-3 pt-10 scroll-smooth overflow-x-scroll scrollbar-none select-none">
      {data && data.length > 0 ? (
        data.map((item) => <ProductCard key={item.id} item={item} items={items} setItems={setItems} increase={increase} />)
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
          <p className="text-xl text-gray-500 font-semibold my-5 grayscale">
            We’re fresh out of this category 😔
          </p>
        </div>
      )}
    </ScrollContainer>
    </section>
  );
};

export default RowContainer;
