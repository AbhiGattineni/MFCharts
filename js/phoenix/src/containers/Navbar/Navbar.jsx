import { useAuth } from "../../../src/context/AuthContext";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

import { BareIcon } from "../../components";
import classNames from "classnames/bind";

const navigationRoutes = [
  "home",
  "about",
  "services",
  "pricing",
  "contact",
  "search",
];

export const Navbar = () => {
  const { logout } = useAuth();
  const handleLogout = (e) => {
    e.preventDefault();

    logout()
      .then((authUser) => {})
      .catch((error) => {
        console.log(error.message);
        alert("Logout Not successfull");
      });
  };

  const [menu, setMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a href="https://flowbite.com" className="flex items-center">
            <BareIcon
              IconComponent={<FaHamburger />}
              classes={["cursor-pointer"]}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MF Charts
            </span>
          </a>
        </Link>
        <div className="flex items-center md:order-2">
          <button
            type="button"
            className="flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            onClick={() => setMenu(!menu)}
          >
            <span className="sr-only">Open user menu</span>
            <BareIcon
              IconComponent={<FaHamburger />}
              classes={["cursor-pointer"]}
            />
          </button>

          <div
            className={classNames(
              { hidden: !menu },
              "z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
            )}
            id="dropdown"
            style={{
              position: "absolute",
              inset: "10% 20% 50% 70%",
              margin: "0px",
            }}
          >
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={handleLogout}
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link href="/home">
                <a
                  href=""
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                >
                  Home
                </a>
              </Link>
            </li>
            <li>
              <Link href="/portfolio">
                <a
                  href=""
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Portfolio
                </a>
              </Link>
            </li>
            <li>
              <Link href="/watchlist">
                <a
                  href=""
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Watchlist
                </a>
              </Link>
            </li>
            <li>
              <Link href="/search">
                <a
                  href=""
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Search
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a
                  href=""
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
