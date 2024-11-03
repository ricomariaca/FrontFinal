import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { ProductHome } from "../../../hunt/pages/ProductHome";
import icon from "../../../assets/icons";
import React, { useContext, useState } from "react";
import images from "../../../assets/images";
import icons from "../../../assets/icons";

export const Navbar = () => {
  const { user, logout, login, logged } = useContext(AuthContext);

  const navigate = useNavigate();
  const onLogin = () => {
    <ProductHome />;
  };

  const onLogout = () => {
    logout();

    navigate("/home", {
      replace: true,
    });
  };
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="bg-white py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-black">
          TWEETS
        </Link>

        <div className="flex items-center">
          <img src={icon.mj} className="w-6 h-6" alt="Icon" />

          {!logged && (
            <NavLink to="/login" className="nav-link text-black mr-96">
              Login
            </NavLink>
          )}

          {logged && (
            <>
              <div className="justify-between">
                <NavLink
                  to="/addPoduct"
                  className="nav-link text-teal-600 mr-20 flex items-center"
                >
                  <img
                    src={icons.submit}
                    alt=""
                    className="inline-block align-text-top mr-2"
                  />
                  Submit
                </NavLink>
              </div>

              <span className="mr-4 text-teal-600">
                {`Hello, ${user?.displayName}`}
              </span>
              <div className="relative mr-20">
                <img
                  src={icon.user}
                  alt="User Icon"
                  className="w-8 h-8 cursor-pointer"
                  onClick={toggleMenu}
                />
                {showMenu && (
                  <ul className="absolute right-0 mt-2 py-2 bg-white border rounded-md shadow-lg min-w-max">
                    <li>
                      <NavLink
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/myProducts"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Products
                      </NavLink>
                    </li>

                    <li>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
