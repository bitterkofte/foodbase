import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "@component/context/StateProvider";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import Plate from "../img/plate.png";
import { actionType } from "@component/context/reducer";
import ScrollContainer from "react-indiana-drag-scroll";
import { useRouter } from "next/router";

const RowContainer = ({ flag, data }) => {
  const rowContainer = useRef();
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();
  const router = useRouter();

  const increase = (item) => {
    function inquery(i) {
      return i.title == item.title;
    }
    const found = cartItems.find(inquery);
    // console.log('BULDUM : ',found)
    if (found) {
      console.log("ZATEN VAR");
      // console.log('O DA BU: ', item.qty)
      item.qty += 1;
      // console.log('SAYISI: ', cartItems)
    } else {
      setItems([...cartItems, item]);
      console.log("SEPET : ", cartItems);
    }
  };

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <ScrollContainer className="w-full flex items-center gap-3 my-5 scroll-smooth overflow-x-scroll scrollbar-none select-none">
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-auto min-w-[275px] md:w-[320px] md:min-w-[300px] rounded-2xl py-4 px-4 my-12 mx:my-5 border-2 border-org1 bg-org0 hover:drop-shadow-lg active:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-10 drop-shadow-md hover:drop-shadow-xl "
                whileHover={{ scale: 1.2 }}
              >
                <Image
                  src={item?.imageURL}
                  alt="image"
                  className="w-full h-full object-contain cursor-pointer"
                  width={700}
                  height={700}
                  onClick={() => router.push(`product/${item.id}`)}
                  id="rsm"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-org3 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => increase(item)}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p
                className="text-textColor font-semibold text-base md:text-lg cursor-pointer"
                onClick={() => router.push(`product/${item.id}`)}
              >
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  {item?.price} <span className="text-sm text-red-500">₺</span>
                </p>
              </div>
            </div>
          </div>
        ))
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
  );
};

export default RowContainer;
