

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserData, logout } from "@/helpers/auth"; 
import { IUser } from "@/interface/userInterface";

const Navbar = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    const updateUserState = () => {
      if (isAuthenticated()) {
        setUserData(getUserData());
      } else {
        setUserData(null);
      }
    };
  
    window.addEventListener('userAuthenticated', updateUserState);
  
    updateUserState();
  
    return () => {
      window.removeEventListener('userAuthenticated', updateUserState);
    };
  }, []);
  

  const handleLogout = () => {
    logout();
    setUserData(null); 
    router.push("/"); 
  };

  return (
    <nav className="sticky top-0 z-10 bg-blue-950 border-gray-200 dark:bg-blue-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-8">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={logo} width={75} height={25} alt="logo" priority />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </a>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-blue-950 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-950 dark:bg-blue-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a href="/" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="/store" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                Store
              </a>
            </li>
            {!userData ? (
              <>
                <li>
                  <a href="/login" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                    Login
                  </a>
                </li>
                <li>
                  <a href="/register" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                    Register
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href={`/user/${userData.name}`} className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href={`/user/${userData.name}/orders`} className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="/cart" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                    Cart
                  </a>
                </li>
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-950 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-200 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-slate-700">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
