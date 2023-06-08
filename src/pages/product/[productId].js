// import { useStateValue } from '@component/context/StateProvider';
import { getAllFoodItems } from "@component/utils/firebaseFunctions";
import { useStateValue } from "../../context/StateProvider";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { actionType } from "@component/context/reducer";
import Image from "next/image";

const ProductsItem = () => {
  const [{ foodItems }, dispatch] = useStateValue();
  const router = useRouter();
  // const {productId} = router.query;
  const id = router.query.productId;
  const prd = foodItems?.filter((i) => i.id == id);
  const product = prd[0];
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
    <div className="flex justify-center mt-48">
      <div className="p-5 flex justify-center gap-10 bg-neutral-200 border-0 border-neutral-400 rounded-xl shadow-md">
        <Image
          src={product?.imageURL}
          alt="image"
          className="w-[400px] pl-6 py-6 bg-neutral-300 rounded-2xl object-contain pointer-events-none cursor-pointer"
          width={700}
          height={700}
          id="rsm"
        />
        <div className="w-52 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-3xl">{product.title}</div>
            <div className="py-1 px-2 w-fit text-sm rounded-lg text-neutral-600 bg-neutral-300 select-none">
              #{product.category}
            </div>
            <div className="text-sm">Seller: <span className="text-orange-400">Convenience Store</span></div>
          </div>

          <div className='w-full py-2 rounded-xl bg-green-600 text-neutral-100 text-center hover:scale-105 cursor-pointer transition-all duration-200'>Add to basket</div>
        </div>
      </div>
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
