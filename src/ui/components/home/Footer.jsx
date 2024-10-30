import React from "react";
import icons from "../../../assets/icons";
import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <h1 className="font-bold text-xl mb-4">Product Hunt</h1>
        <nav className="mb-4">
          <NavLink to="/" className="text-teal-600 font-semibold mx-2">
            Home
          </NavLink>
          <NavLink to="/" className="text-teal-600 font-semibold mx-2">
            About us
          </NavLink>
          <NavLink to="/" className="text-teal-600 font-semibold mx-2">
            Products
          </NavLink>
        </nav>

        <div className="flex items-center justify-center mb-4">
          <img src={icons.IconF} className="mr-4" />
          <img src={icons.IconFF} className="mr-4" />
          <img src={icons.Twit} className="mr-4" />
          <img src={icons.Tik} className="mr-4" />
          <img src={icons.YouT} className="mr-4" />
        </div>

        <hr className="w-full border-gray-200 border-t-2 my-4" />
      </div>
    </footer>
  );
};
