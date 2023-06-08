// import { useStateValue } from '@component/context/StateProvider';
import { getAllFoodItems } from "@component/utils/firebaseFunctions";
import { useStateValue } from "../../context/StateProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { actionType } from "@component/context/reducer";
import Image from "next/image";
import CartContainer from "@component/components/CartContainer";

const ProductsItem = () => {
  const [items, setItems] = useState([]);
  const [{ foodItems, cartItems, cartShow }, dispatch] = useStateValue();
  const router = useRouter();
  // const {productId} = router.query;
  const id = router.query.productId;
  const prd = foodItems?.filter((i) => i.id == id);
  let product = [];
  if (prd) {
    product = prd[0];
  }
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

  const increase = (product) => {
    function inquery(i) {
      return i.title == product.title;
    }
    const found = cartItems.find(inquery);
    // console.log('BULDUM : ',found)
    if (found) {
      console.log("ZATEN VAR");
      // console.log('O DA BU: ', item.qty)
      product.qty += 1;
      // console.log('SAYISI: ', cartItems)
    } else {
      setItems([...cartItems, product]);
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
    <div className="flex justify-center mt-48">
      <div className="p-5 flex justify-center gap-10 bg-neutral-200 border-0 border-neutral-400 rounded-xl shadow-md">
        <Image
          src={product?.imageURL}
          alt="image"
          className="w-[400px] py-6 bg-neutral-300 rounded-2xl object-contain"
          width={700}
          height={700}
          id="rsm"
        />
        <div className="w-52 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">{product.title}</div>
            <div className="mt-4 py-1 px-2 w-fit text-sm rounded-lg text-neutral-600 bg-neutral-300 select-none">
              #{product.category}
            </div>
            <div className="text-sm">
              Seller: <span className="text-orange-400">Convenience Store</span>
            </div>
            <div className="text-sm">Calories: {product.calories} kcal</div>
            <div className="mt-4 text-3xl font-semibold">
              {product.price}
              <span className="text-2xl text-red-500"> ₺</span>
            </div>
          </div>

          <div
            className="w-full py-2 rounded-xl bg-green-600 text-neutral-100 text-center hover:scale-105 cursor-pointer transition-all duration-200"
            onClick={() => increase(product)}
          >
            Add to basket
          </div>
        </div>
      </div>
      {cartShow && <CartContainer />}
    </div>
  );
};

export default ProductsItem;

// export const getServerSideProps = async () => {
//   const [{ foodItems }, dispatch] = await useStateValue();
//   await getAllFoodItems().then((data) => {
//     dispatch({
//       type: actionType.SET_FOOD_ITEMS,
//       foodItems: data,
//     });
//   });
// }
