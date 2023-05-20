import Image from "next/image";
import Header from "@component/components/Header";
import { AnimatePresence } from "framer-motion";
import MainContainer from "@component/components/MainContainer";
import { useStateValue } from "@component/context/StateProvider";
import { getAllFoodItems } from "@component/utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "@component/context/reducer";
import Head from "next/head";
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
    <>
      <Head>
        <title>FoodBase</title>
        <meta
          name="description"
          content="A food delivery site that you can order groceries and hot dishes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/FoodBase2.ico" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="FoodBase - Groceries and Food Delivery"
        />
        <meta property="og:url" content="https://foodbase-tr.vercel.app/" />
        <meta
          property="og:image"
          content="https://foodbase-tr.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFoodBase-bg-orange.0831433a.jpg&w=750&q=75"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://foodbase-tr.vercel.app/"
        />
        <meta property="twitter:title" content="FoodBase" />
        <meta
          property="twitter:description"
          content="A food delivery site that you can order groceries and hot dishes."
        />
        <meta
          property="twitter:image"
          content="https://foodbase-tr.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFoodBase-bg-orange.0831433a.jpg&w=750&q=75"
        />
      </Head>
      <AnimatePresence mode="wait">
        <div className="w-full h-auto flex flex-col bg-primary">
          <MainContainer />
        </div>
      </AnimatePresence>
    </>
  );
}
