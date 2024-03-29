import Image from "next/image";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdShoppingBasket, MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "@component/context/StateProvider";
import { actionType } from "@component/context/reducer";
import Link from "next/link";

const ProductCard = ({item, items, increase, setItems}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.4 }}
      key={item?.id}
      className="w-275 h-auto min-w-[275px] md:w-[320px] md:min-w-[300px] rounded-2xl py-4 px-4 mx:my-5 border-2 border-org1 bg-org0 hover:drop-shadow-lg active:drop-shadow-lg flex flex-col items-center justify-evenly self-start relative"
    >
      <div className="w-full flex items-center justify-between">
        <motion.div
          className="w-40 h-40 -mt-10 drop-shadow-md hover:drop-shadow-xl"
          whileHover={{ scale: 1.2 }}
        >
          <Link href={`product/${item.id}`}>
          <Image
            src={item?.imageURL}
            alt="image"
            className="w-full h-full object-contain cursor-pointer"
            width={700}
            height={700}
            // onClick={() => router.push(`product/${item.id}`)}
            id="rsm"
          />
          </Link>
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
        <Link
          className="text-textColor font-semibold text-base md:text-lg cursor-pointer"
          // onClick={() => router.push(`product/${item.id}`)}
          href={`product/${item.id}`}
        >
          {item?.title}
        </Link>
        <p className="flex text-amber-500 drop-shadow-md">
          {Array(5).fill(0).map((m, i) => (Math.round(item?.stars) >= i+1 ? <MdOutlineStar key={i}/> : <MdOutlineStarOutline key={i}/>))}
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
    </motion.div>
  );
};

export default ProductCard;