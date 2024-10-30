import React from "react";
import images from "../../../assets/images";

export const BannerHome = () => {
  return (
    <div className="mt-8 flex justify-between">
      <div className="mx-8 text-center mt-16">
        <h1 className="font-bold text-6xl">
          Explore <br /> innovation
        </h1>
        <p className="mt-4">The place to launch and discover new products.</p>
        <button className="mt-8 px-4 py-2 bg-teal-600 rounded-full text-white">
          Get Started
        </button>
      </div>
      <div className="mx-8">
        <img src={images.banner} alt="Banner" />
      </div>
    </div>
  );
};
