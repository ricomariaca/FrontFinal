import { useContext } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context";
import { useForm } from "../../hooks";

const initForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { username, password, onInputChange } = useForm(initForm);

  const onLogin = async (event) => {
    event.preventDefault();
    const isValidLogin = await login(username, password);
    if (isValidLogin) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };

  const onLoginasd = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });

      setServerMessage(response.data.message);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Error en el registro."
      );
    }
    const lastPath = localStorage.getItem("lastPath") || "/";
    navigate(lastPath, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-blue-500 mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
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
        </form>

        <div className="mt-4 text-sm text-gray-500">
          <span>Don't have an account?</span>
          <NavLink to="/register" className="text-blue-500 hover:underline">
            {" "}
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};
