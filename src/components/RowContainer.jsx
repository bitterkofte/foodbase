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
  const rowContainer = useRef();
  // const [items, setItems] = useState([]);
  // const [{ cartItems }, dispatch] = useStateValue();
  // // const router = useRouter();

  // const increase = (item) => {
  //   function inquery(i) {
  //     return i.title == item.title;
  //   }
  //   const found = cartItems.find(inquery);
  //   // console.log('BULDUM : ',found)
  //   if (found) {
  //     console.log("ZATEN VAR");
  //     // console.log('O DA BU: ', item.qty)
  //     item.qty += 1;
  //     // console.log('SAYISI: ', cartItems)
  //   } else {
  //     setItems([...cartItems, item]);
  //     console.log("SEPET : ", cartItems);
  //   }
  // };

  // const addtocart = () => {
  //   dispatch({
  //     type: actionType.SET_CART_ITEMS,
  //     cartItems: items,
  //   });
  //   localStorage.setItem("cartItems", JSON.stringify(items));
  // };

  // useEffect(() => {
  //   addtocart();
  // }, [items]);

  return (
    <section className='w-full my-6'>
      <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & healthy foods
          </p>
      </div>
    <ScrollContainer className="w-full flex items-center gap-3 my-12 scroll-smooth overflow-x-scroll scrollbar-none select-none">
      {data && data.length > 0 ? (
        data.map((item) => <ProductCard item={item} />)
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
