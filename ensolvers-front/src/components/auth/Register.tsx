import axiosInstance from "@/shared/axiosInstance";
import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";

const Register: FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, username, email, password);
    const res = axiosInstance.post("/user/register", {
      name,
      username,
      email,
      password,
    });
    console.log(await res);
    router.push("login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          Register
        </h2>

        <form className="mt-10" onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
          />

          <label
            htmlFor="username"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
          />

          <label
            htmlFor="email"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="E-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full py-3 px-1 mt-2 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
          />

          <label
            htmlFor="password"
            className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full py-3 px-1 mt-2 mb-4
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required
          />

          <button
            type="submit"
            className="w-full py-3 mt-10 bg-gray-800 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-gray-700 hover:shadow-none"
          >
            Register
          </button>

          <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            <a href="#" className="flex-2 underline">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
