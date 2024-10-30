import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";

const initForm = {
  email: "",
  password: "",
  displayName: "",
};
export const RegisterPage = () => {
  const { register, errorMessage } = useContext(AuthContext);

  const navigate = useNavigate();

  const { email, password, displayName, onInputChange } = useForm(initForm);

  const onRegister = async (event) => {
    event.preventDefault();

    const isValidRegister = await register(email, password, displayName);

    if (isValidRegister) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                User name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                placeholder="Enter user name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
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
              onClick={onRegister}
              type="submit"
              className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
            >
              Register
            </button>
            <br />
            {!errorMessage ? null : (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </form>
          <span>Do you have an existing account?</span>
          <Link to="/login"> Login</Link>
        </div>
      </div>
    </>
  );
};
