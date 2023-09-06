import React from "react";
import Image from "next/image";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      {/* 1st Block */}
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <Image
              src={Delivery}
              className="w-full h-full object-contain pt-[2px]"
              alt="delivery"
              width={100}
              height={100}
              id="rsm"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in
          <span className="text-orange-600 text-[3rem] lg:text-[5rem] ml-3 lg:ml-9">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
        Your weekly grocery haul, now delivered on demand. No time slots, no substitutions, and over 1500 products, We are currently delivering in Chicago, New York and Boston!
        </p>

        <button
          id="groceries"
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>

      {/* 2nd Block */}
      <div className="py-2 flex-1 flex items-center relative">
        <Image
          src={HeroBg}
          className=" ml-auto h-auto w-full lg:w-auto lg:h-650"
          alt="hero-bg"
          width={300}
          height={300}
          id="rsm"
        />

        {/* Showcase */}
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center xl:px-20 2xl:px-28 lg:py-10 py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg hover:scale-105 transition-all ease-in-out"
              >
                <Image
                  src={n.imageSrc}
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                  alt={n.name}
                  width={300}
                  height={300}
                  id="rsm"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {n.decp}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  {n.price} <span className="text-xs text-red-600">₺</span>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
