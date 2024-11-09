import icons from "../../../assets/icons";
import { NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../auth";

export const CardProduct = (props) => {
  const { logged } = useContext(AuthContext);
  return (
    <>
      <div>
        <div>
          <div>
            <img src={icons.user} />
            {!logged && (
              <NavLink
                to="/productView"
                className="nav-link text-teal-600 mr-96"
              >
                {props.username}
              </NavLink>
            )}

            {logged && (
              <>
                <NavLink
                  to="/productViewlog"
                  className="nav-link text-teal-600 mr-96"
                >
                  {props.username}
                </NavLink>
              </>
            )}
            <p>{props.body}</p>
          </div>
        </div>
      </div>
    </>
  );
};
