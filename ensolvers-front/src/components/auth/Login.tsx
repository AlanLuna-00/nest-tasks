import axiosInstance from "@/shared/axiosInstance";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
import Link from "next/link";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    const res = await axiosInstance.post("/user/login", {
      email,
      password,
    });
    console.log(res.data.user);
    dispatch(setUser(res.data.user));
    localStorage.setItem("userNotes", JSON.stringify(res.data.user));
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
      >
        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          Login
        </h2>

        <form className="mt-10" onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-gray-600 uppercase"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e-mail address"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
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
            Login
          </button>

          <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
            {/* create an account */}
            <Link href="register" className="flex-2 underline text-black">
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
