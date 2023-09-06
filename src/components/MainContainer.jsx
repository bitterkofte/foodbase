import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "@component/context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      {cartShow && <CartContainer />}
      
      {/* ANCHOR Ante */}
      <HomeContainer />

      {/* ANCHOR First Showcase */}
      <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-28 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Prominent Products
          </p>
      </div>
      <RowContainer data={foodItems?.filter((n) => n.category === "fruits")} />

      {/* ANCHOR Second Showcase */}
      <MenuContainer />
    </div>
  );
};

export default MainContainer;
