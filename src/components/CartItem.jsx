import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { fetchCart } from "../utils/fetchLocalStorageData";
import Image from "next/image";
let items = [];

const CartItem = ({ item, setFlag, flag }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setQty] = useState(item.qty);

  const cartDispatch = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    if(items !== []) localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const updateQty = (action, id) => {
    if (action == "add") {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch();
    } else {
      // initial state value is one so you need to check if 1 then remove it
      if (qty == 1) {
        items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch();
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch();
      }
    }
  };

  useEffect(() => {
    items = cartItems;
  }, [qty, items]);

  return (
    <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 drop-shadow-md">
      <Image
        src={item?.imageURL}
        width={50}
        height={50}
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        alt=""
        id="rsm"
      />

      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50">{item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          {parseFloat(item?.price) * qty} ₺
        </p>
      </div>

      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item?.id)}
        >
          <BiMinus className="text-gray-50 cursor-pointer hover:text-red-500 duration-300" size={23} />
        </motion.div>

        <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {qty}
        </p>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item?.id)}
        >
          <BiPlus className="text-gray-50 cursor-pointer hover:text-green-500 duration-300" size={23} />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItem;