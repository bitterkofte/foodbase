import Image from "next/image";
import Header from "@component/components/Header";
import { AnimatePresence } from "framer-motion";
import MainContainer from "@component/components/MainContainer";
import { useStateValue } from "@component/context/StateProvider";
import { getAllFoodItems } from "@component/utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "@component/context/reducer";
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="w-full h-auto flex flex-col bg-primary">
        <MainContainer />
      </div>
    </AnimatePresence>
  );
}
