"use client";
import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setLogout } from "@/redux/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  // Función para manejar el botón de Logout
  const handleLogout = () => {
    // Aquí puedes implementar la lógica para cerrar sesión del usuario
    setLogout();
    localStorage.removeItem("userNotes");
    setIsLoggedIn(false);
    router.push("/auth/login");
  };

  useEffect(() => {
    if (localStorage.getItem("userNotes")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Notes App</span>
      </div>
      <div className="block lg:hidden">
        {/* Botón para mostrar el menú en dispositivos móviles */}
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 0h20v20H0z" fill="none" />
            <path
              d="M0 4h20v2H0zM0 9h20v2H0zM0 14h20v2H0z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        {/* Elementos del menú a la derecha */}
        {isLoggedIn ? (
          <div>
            {/* Mostrar Logout si el usuario está logueado */}
            <button
              onClick={handleLogout}
              className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            {/* Mostrar Login si el usuario no está logueado */}
            <button className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
              <Link href={"auth/login"}>Login</Link>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
