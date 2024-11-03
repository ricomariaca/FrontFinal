import { useState } from "react";
import { useForm } from "../../hooks";
import { Link } from "react-router-dom";
import axios from "axios";

const initForm = {
  email: "",
  password: "",
  name: "",
  lastName: "",
  username: "",
};

export const RegisterPage = () => {
  const { email, password, name, lastName, username, onInputChange } =
    useForm(initForm);
  const [serverMessage, setServerMessage] = useState("");

  const onRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        name,
        lastName,
        username,
        email,
        password,
      });

      setServerMessage(response.data.message);
    } catch (error) {
      setServerMessage(
        error.response?.data?.message || "Error en el registro."
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Register</h2>
          <form onSubmit={onRegister}>
            <div className="mb-4">
              <label
                htmlFor="text"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="Enter name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                placeholder="Enter last name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={onInputChange}
                placeholder="Enter username"
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
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Register
            </button>
            <br />
            {serverMessage && (
              <div
                className="alert alert-info mt-2 text-green-600"
                role="alert"
              >
                {serverMessage}
              </div>
            )}
          </form>
          <span className="text-gray-700">
            Do you have an existing account?
          </span>
          <Link to="/login" className="text-blue-500 ml-1">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};
