import React, { useEffect } from "react";

export const fetchUser = () => {
  if (typeof window !== 'undefined') {
    console.log("FETCHHHHHH")
    const userInfo = localStorage.getItem("user") !== "undefined"
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();
  
    return userInfo;
  }
}