import React, { useEffect, useRef, useState } from "react";
import { useStateValue } from "@component/context/StateProvider";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdShoppingBasket } from "react-icons/md";
import Plate from "../img/plate.png";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = () => {
    // dispatch({
    //   type: actionType.SET_CARTITEMS,
    //   cartItems: items,
    // });
    // localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  return (
    <div
      id="no-scbar"
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px] bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <Image
                  src={item?.imageURL}
                  alt="image"
                  className="w-full h-full object-contain"
                  width={100}
                  height={100}
                  id="rsm"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => setItems([...cartItems, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
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
    </div>
  );
};

export default RowContainer;
