import React, { useContext } from "react";

import icons from "../../../assets/icons";
import { AuthContext } from "../../../auth";
import { ProductView } from "../../../hunt/pages/products/ProductView";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const CardProduct = (props) => {
  const { logged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path, {
      state: {
        key: props._id,
        name: props.username,
        url: props.body,
      },
    });
  };

  return (
    <>
      <div>
        <div>
          {!logged ? (
            <button
              onClick={() => handleNavigate("/productView")}
              className="nav-link "
            >
              {props.username}
            </button>
          ) : (
            <button
              onClick={() => handleNavigate("/productViewlog")}
              className="nav-link"
            >
              {props.username}
            </button>
          )}

          <img
            src={icons.user}
            alt="User Icon"
            className="w-8 h-8 cursor-pointer rounded-full"
          />
        </div>
        <div>
          <p>{props.body}</p>
        </div>
      </div>
    </>
  );
};
