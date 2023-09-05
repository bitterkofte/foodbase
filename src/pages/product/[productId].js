// import { useStateValue } from '@component/context/StateProvider';
import { getAllFoodItems, updateItem } from "@component/utils/firebaseFunctions";
import { useStateValue } from "../../context/StateProvider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { actionType } from "@component/context/reducer";
import Image from "next/image";
import Link from "next/link";
import CartContainer from "@component/components/CartContainer";
import ReviewCard from "@component/components/ReviewCard";
import { MdClose, MdOutlineStar, MdOutlineStarOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import WarningModal from "@component/components/WarningModal";
import Head from "next/head";
import NextHead from "@component/components/NextHead";
import NextOGHead from "@component/components/NextOGHead";

const ProductsItem = () => {
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [revTitle, setRevTitle] = useState("");
  const [revDesc, setRevDesc] = useState("");
  const [rMStarError, setRMStarError] = useState(false);
  const [rMTitleError, setRMTitleError] = useState(false);
  const [rMDescError, setRMDescError] = useState(false);
  const [items, setItems] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [wModal, setWModal] = useState(false);
  // const [product, setProduct] = useState();
  const [{ user, foodItems, cartItems, cartShow }, dispatch] = useStateValue();
  const router = useRouter();

  const id = router.query.productId;
  const prd = foodItems?.filter((i) => i.id == id);

  let product;
  if (prd) [product] = prd;

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

  const closeModalHandler = () => {
    setStars(0);
    setRevTitle("");
    setRevDesc("");
    setReviewModal(false)
  }

  const makeAReview = () => {
    if(!user){
      console.log("GİRİŞ YAP")
      setWModal(true);
    }
    else setReviewModal(true);
  }

  const uploadReview = () => {
    if (stars === 0 || revTitle === '' || revDesc === '') {
      if(stars === 0) setRMStarError(true);
      if(revTitle === '') setRMTitleError(true);
      if(revDesc === '') setRMDescError(true);
      setTimeout(() => {
        setRMStarError(false);
        setRMTitleError(false);
        setRMDescError(false);
      }, 2000);
    }
    else {
      let newR = {
        title: revTitle,
        description: revDesc,
        stars: stars,
        username: user.displayName,
        userphoto: user.photoURL,
        date: Date.now(),
      };
      if(product?.stars === 0) product.stars = stars;
      else product.stars = Number.parseFloat(((product.stars * product.reviews.length) + stars) / (product.reviews.length + 1)).toFixed(3);
      product?.reviews.push(newR);
      updateItem(product, product.id);
      closeModalHandler();
    }
  };

  return (
    <>
    {/* <NextHead/> */}
    <NextOGHead product={product} />
    
    <div className="xsm:mt-24 md:mt-40 mb-20">
      {/* ANCHOR Review Modal */}
      <AnimatePresence>
      {wModal && <WarningModal color={"red"} setWModal={setWModal} wMTitle={"No User"} wMDesc={"You have to sign in to your account first to make a review."}/>}
      {reviewModal && (
        <div className="z-[99] fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed w-full h-full z-[100] top-0 left-0 bg-modalColor"
            onClick={closeModalHandler}
          ></motion.div>
          <motion.div
            initial={{ y: -2000 ,opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -1000, opacity: 0 }}
            transition={{ duration: 0.3 }} 
            //fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            className="relative w-2/6 flex flex-col gap-y-2 p-8 z-[101] bg-slate-200 rounded-md">
            <h2 className="text-xl font-semibold mb-3">Make A Review</h2>
            <MdClose
              onClick={closeModalHandler}
              className="absolute top-3 right-3 bg-slate-500 hover:bg-red-500 text-slate-100 rounded-md transition-all cursor-pointer"
              size={20}
            />
            <div className='mx-auto relative'>
              {hoverStars === 0 ?
              <div className={`mb-2 mx-auto flex duration-300 ${rMStarError ? 'text-red-500' : 'text-amber-500'}`} onMouseEnter={() => setHoverStars(1)} onMouseLeave={() => setHoverStars(0)}>
                {stars >= 1
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(1)} onClick={() => setStars(1)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(1)} onClick={() => setStars(1)}/> }
                {stars >= 2
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(2)} onClick={() => setStars(2)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(2)} onClick={() => setStars(2)}/> }
                {stars >= 3
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(3)} onClick={() => setStars(3)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(3)} onClick={() => setStars(3)}/> }
                {stars >= 4
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(4)} onClick={() => setStars(4)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(4)} onClick={() => setStars(4)}/> }
                {stars === 5
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(5)} onClick={() => setStars(5)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(5)} onClick={() => setStars(5)}/> }
              </div>
              :
              <div className='mb-2 mx-auto flex text-amber-500'>
                {hoverStars >= 1
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(1)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(1)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(1)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(1)}/> }
                {hoverStars >= 2
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(2)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(2)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(2)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(2)}/> }
                {hoverStars >= 3
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(3)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(3)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(3)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(3)}/> }
                {hoverStars >= 4
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(4)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(4)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(4)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(4)}/> }
                {hoverStars === 5
                ? <MdOutlineStar        className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(5)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(5)}/>
                : <MdOutlineStarOutline className="cursor-pointer" size={35} onMouseEnter={() => setHoverStars(5)} onMouseLeave={() => setHoverStars(0)} onClick={() => setStars(5)}/> }
              </div>
              }
            </div>
            <input
              className={`px-3 py-2 rounded-md outline-none focus:shadow-md transition-all duration-300 ${rMTitleError && 'bg-red-400 placeholder:text-white'}`}
              placeholder="Title"
              type="text"
              value={revTitle}
              onChange={(e) => setRevTitle(e.target.value)}
            />
            <textarea
              className={`px-3 py-2 mb-3 rounded-md outline-none focus:shadow-md transition-all duration-300 ${rMDescError && 'bg-red-400 placeholder:text-white'}`}
              placeholder="Description"
              rows="5"
              type="text"
              value={revDesc}
              onChange={(e) => setRevDesc(e.target.value)}
            />
            <button
              onClick={uploadReview}
              className={`py-2 px-3 bg-slate-500 text-neutral-200 rounded-md transition-all ${(rMStarError || rMTitleError || rMDescError) ? 'hover:bg-red-500' : 'hover:bg-amber-500'}`}
            >
              Send
            </button>
          </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* ANCHOR Product */}
      <div className="mx-auto xsm:w-5/6 sm:w-4/6 md:w-3/6 p-5 xsm:flex-col lg:flex-row flex justify-center gap-10 bg-neutral-200 border-0 border-neutral-400 rounded-xl shadow-md">
        {/* <div className='w-[500px] h-[500px] bg-red-300'> */}
        <Image
          src={product?.imageURL}
          alt="image"
          className="w-[400px] h-[400px] py-6 sm:self-center bg-neutral-300 rounded-2xl object-contain"
          width={700}
          height={700}
          id="rsm"
          // priority
        />
        {/* </div> */}
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className='flex flex-row items-center justify-between lg:flex-col lg:items-start gap-y-3'>
              <h1 className="text-3xl font-bold">{product?.title}</h1>
              <Link href={`#review`} className='flex text-amber-500 text-2xl drop-shadow-md'>
                {Array(5).fill(0).map((m, i) => (Math.round(product?.stars) >= i+1 ? <MdOutlineStar/> : <MdOutlineStarOutline/>))}
              </Link>
            </div>
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
            className="w-full mt-6 py-2 rounded-xl hover:shadow-lg bg-green-600 text-neutral-100 text-center hover:scale-105 cursor-pointer transition-all duration-200"
            onClick={() => increase(product)}
          >
            Add to basket
          </div>
        </div>
      </div>

      {cartShow && <CartContainer />}

      {/* ANCHOR Review Section */}
      <div id="review" className="mx-auto mt-10 xsm:w-5/6 sm:w-4/6 md:w-3/6 p-5 bg-neutral-200 rounded-xl shadow-md">
        <div className="mb-5 gap-y-3 xsm:flex-col lg:flex-row flex lg:justify-between lg:items-center">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div
            className="py-2 px-4 rounded-xl hover:shadow-lg bg-blue-600 text-neutral-100 text-center hover:scale-105 cursor-pointer transition-all duration-200"
            onClick={makeAReview}
          >
            Make a review
          </div>
        </div>
        <div className='flex flex-col gap-5'>
        {product?.reviews.length > 0 ? (
          product.reviews.map((rev) => (
            <ReviewCard key={rev.date} userInfo={user} reviewInfo={rev} />
            ))
            ) : (
              <div className="text-center text-neutral-600 grayscale ">No Reviews Yet <span className="not-italic">😕</span> </div>
              )}
        </div>
      </div>
    </div>
    </>
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
