import { useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";

import { AuthContext } from "../context";
import { Navbar } from "../../ui/components/common/Navbar";
import { useForm } from "../../hooks";

const initForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { login, errorMessage, loginGoogle } = useContext(AuthContext);

  const navigate = useNavigate();

  const { email, password, onInputChange } = useForm(initForm);

  const onLogin = async (event) => {
    event.preventDefault();
    const isValidLogin = await login(email, password);

    if (isValidLogin) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, {
        replace: true,
      });
    }
  };

  const onGoogleLogin = async (event) => {
    event.preventDefault();
    const isValidLogin = await loginGoogle();

    if (isValidLogin) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, {
        replace: true,
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="Enter email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="Enter password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              onClick={onLogin}
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
            >
              Login
            </button>
            <button
              onClick={onGoogleLogin}
              type="submit"
              className="w-full bg-teal-400 text-white py-2 rounded-md hover:bg-teal-700"
            >
              Google
            </button>
            <br />
            {!errorMessage ? null : (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </form>
          <span>Do you want create a new account?</span>
          <Link to="/register"> Register</Link>
        </div>
      </div>
    </>
  );
};
