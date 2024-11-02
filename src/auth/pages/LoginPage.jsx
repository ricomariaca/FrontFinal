import { useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context";
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
      navigate(lastPath, { replace: true });
    }
  };

  const onGoogleLogin = async (event) => {
    event.preventDefault();
    const isValidLogin = await loginGoogle();
    if (isValidLogin) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-blue-500 mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Username
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
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
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm" role="alert">
              {errorMessage}
            </div>
          )}
        </form>
        
        <div className="mt-4 text-sm text-gray-500">
          <span>Don't have an account?</span>
          <NavLink to="/register" className="text-blue-500 hover:underline">
            {" "}Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};
