// import { useStateValue } from '@component/context/StateProvider';
import { getAllFoodItems } from "@component/utils/firebaseFunctions";
import { useStateValue } from "../../context/StateProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { actionType } from "@component/context/reducer";
import Image from "next/image";
import CartContainer from "@component/components/CartContainer";
import ReviewCard from "@component/components/ReviewCard";
import {MdClose} from 'react-icons/md'

const ProductsItem = () => {
  const [items, setItems] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  // const [product, setProduct] = useState();
  const [{ user, foodItems, cartItems, cartShow }, dispatch] = useStateValue();
  const router = useRouter();

  const id = router.query.productId;
  const prd = foodItems?.filter((i) => i.id == id);
  
  let product;
  if (prd) [product] = prd;

  // const makeAReview = () => {

  // }

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
    <div className="mt-40 mb-20">
      {/* ANCHOR Review Modal */}
      {reviewModal &&
        <div className=''>
        <div className='fixed w-full h-full z-[100] top-0 left-0 bg-modalColor' onClick={() => setReviewModal(false)}></div>
        <div className=' flex flex-col gap-y-2 fixed p-8 z-[101] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-200 rounded-md'>
          <h2 className="font-semibold mb-3">Make A Review</h2>
          <MdClose onClick={() => setReviewModal(false)} className="absolute top-3 right-3  bg-slate-500 hover:bg-red-500 text-slate-100 rounded-md transition-all cursor-pointer" size={20} />
          <input className="px-3 py-2 rounded-md outline-none" placeholder="Stars"/>
          <input className="px-3 py-2 rounded-md outline-none" placeholder="Title"/>
          <input className="px-3 py-2 mb-3 rounded-md outline-none" placeholder="Description"/>
          <button onClick={() => setReviewModal(false)} className="py-1 px-3 bg-slate-500 hover:bg-org2 text-neutral-200 rounded-md transition-all" >Send</button>
        </div>
        </div>
      }

      {/* ANCHOR Product */}
      <div className="mx-auto w-3/6 p-5 flex justify-center gap-10 bg-neutral-200 border-0 border-neutral-400 rounded-xl shadow-md">
        {/* <div className='w-[500px] h-[500px] bg-red-300'> */}
        <Image
          src={product?.imageURL}
          alt="image"
          className="w-[400px] h-[400px] py-6 bg-neutral-300 rounded-2xl object-contain"
          width={700}
          height={700}
          id="rsm"
          // priority
          />
        {/* </div> */}
        <div className="w-52 flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">{product?.title}</div>
            <div className="mt-4 py-1 px-2 w-fit text-sm rounded-lg text-neutral-600 bg-neutral-300 select-none">
              #{product?.category}
            </div>
            <div className="text-sm">
              Seller: <span className="text-orange-400">Convenience Store</span>
            </div>
            <div className="text-sm">Calories: {product?.calories} kcal</div>
            <div className="mt-4 text-3xl font-semibold">
              {product?.price}
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

      {/* ANCHOR Review Section */}
      <div className='mx-auto w-3/6 mt-10 p-5 bg-neutral-200 rounded-xl shadow-md'>
        <div className='mb-5 flex justify-between items-center'>          
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div
            className="py-2 px-4 rounded-xl bg-blue-600 text-neutral-100 text-center hover:scale-105 cursor-pointer transition-all duration-200"
            onClick={() => setReviewModal(true)}
          >
            Make a review
          </div>
        </div>
        {product?.reviews.length > 0
        ? product.reviews.map(rev => (
            <ReviewCard userInfo={user} reviewInfo={rev} />
          ))
        : <div className=''>No Comments</div>
        }
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
