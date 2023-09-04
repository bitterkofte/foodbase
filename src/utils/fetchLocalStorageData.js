import React, { useEffect } from "react";

export const fetchUser = () => {
  if (typeof window !== 'undefined') {
    // console.log("FETCHHHHHH")
    const userInfo = localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
  
    return userInfo;
  }
}

export const fetchCart = () => {
  if (typeof window !== 'undefined') {
    // console.log("FETCHHHHHH")

    const cartInfo = localStorage.getItem("cartItems") !== "undefined"
    ? JSON.parse(localStorage.getItem("cartItems"))
    : localStorage.clear();

    // const cartInfo = JSON.parse(localStorage.getItem("cartItems"));
  
    return cartInfo ? cartInfo : [];
  }
}