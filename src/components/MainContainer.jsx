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
      <RowContainer data={foodItems?.filter((n) => n.category === "fruits")} />

      {/* ANCHOR Second Showcase */}
      <MenuContainer />
    </div>
  );
};

export default MainContainer;
