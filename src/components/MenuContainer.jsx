import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import ScrollContainer from "react-indiana-drag-scroll";

const MenuContainer = () => {
  const [filter, setFilter] = useState("real-food");

  const [{ foodItems }, dispatch] = useStateValue();
  // console.log("FOOD: ", foodItems);
  // console.log("filter: ", filter);
  return (
    <section className="w-full my-8 mt-10" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Categories
        </p>

        <ScrollContainer className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none no-scbar select-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.85 }}
                key={category.id}
                className={`group ${
                  filter === category.urlParamName
                    ? "bg-org3 hover:bg-org4"
                    : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-org2 duration-200 `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.urlParamName ? "bg-white" : "bg-org3"
                  } group-hover:bg-white flex items-center justify-center duration-200`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg duration-200`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white duration-200`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </ScrollContainer>

        <div className="w-full flex items-center justify-between mt-5">
          <p className="text-2xl font-semibold capitalize relative text-headingColor before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our Fresh & healthy foods
          </p>
        </div>
        <div className="w-full">
          <RowContainer data={foodItems?.filter((n) => n.category === filter)} />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
