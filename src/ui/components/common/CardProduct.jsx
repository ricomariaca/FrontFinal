import icons from "../../../assets/icons";
import { NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../auth";

export const CardProduct = (props) => {
  const { logged } = useContext(AuthContext);
  return (
    <>
      {!logged && (
        <NavLink to="/productView" className="nav-link text-teal-600 mr-96">
          <img src={`../../../src/assets/img/${props.url}`} />
        </NavLink>
      )}

      {logged && (
        <>
          <NavLink
            to="/productViewlog"
            className="nav-link text-teal-600 mr-96"
          >
            <img src={`../../../src/assets/img/${props.url}`} />
          </NavLink>
        </>
      )}
      <div>
        <div>
          <h1>{props.name}</h1>
          <p>{props.description}</p>
          <div>
            <img src={icons.user} />
            <img src={icons.totalR} />
            <p>4.0</p>
            <img src={icons.stars} />

            {/*<StarRating />*/}
          </div>
        </div>
      </div>
    </>
  );
};
