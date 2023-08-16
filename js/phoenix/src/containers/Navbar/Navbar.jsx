import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../../src/context/AuthContext";
import { BsGraphUp } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../config/firebase";
import { BareIcon, Modal } from "../../components";
import classNames from "classnames/bind";
import { Alert } from "../../components/Alert/Alert";

export const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const [menu, setMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserName(user.displayName);
        setEmail(user.email);
        console.log("uid", user.displayName);
      } else {
        console.log("user is logged out");
      }
    });
  }, []);
  const [tabs, setTabs] = useState({
    dashboard: pathname == "/" ? true : false,
    portfolio: pathname == "/portfolio" ? true : false, 
    timeline: pathname == "/timeline" ? true : false,
    watchlist: pathname == "/watchlist" ? true : false,
    search: pathname == "/search" ? true : false,
    contact: pathname == "/contact" ? true : false,
    profile: pathname == "/profile" ? true : false,
  });

  const handleLogout = (e) => {
    e.preventDefault();

    logout()
      .then((authUser) => {})
      .catch((error) => {
        console.log(error.message);
        alert("Logout Not successfull");
      });
  };

  const handleClick = (e) => {
    setTabs({ [e.target.value]: true });
  };

  return (
    <nav className="bg-white border-gray-600 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 border-b-2">
      <div className="container flex flex-wrap justify-between items-center mx-auto relative">
        <Link href="/">
          <a href="https://flowbite.com" className="flex items-center">
            <BareIcon
              IconComponent={<BsGraphUp />}
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
            className="flex mr-3 text-sm rounded-full md:mr-0"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            onClick={() => setMenu(!menu)}
          >
            <span className="sr-only">Open user menu</span>
            <img
              class="w-10 h-10 rounded-full bg-gray-500"
              src={auth.currentUser.photoURL?auth.currentUser.photoURL:'https://www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg'}
              alt="Rounded avatar"
            />
          </button>

          <div
            className={classNames(
              { hidden: !menu },
              "z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-12 right-0"
            )}
            id="dropdown"
            style={{
              margin: "0px",
            }}
          >
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">
                {userName}
              </span>
              <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {email}
              </span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              <li onClick={() => setMenu(!menu)}>
                <Link href="/profile">
                  <a
                    href="#"
                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => setShowModal(true)}
                >
                  Sign out
                </a>
                {showModal ? (
                  <Modal
                    confirmMsg={handleLogout}
                    head="Confirm Sign Out?"
                    visible={showModal}
                    onClose={() => setShowModal(false)}
                  >
                    Are you sure you want to sign out?
                  </Modal>
                ) : null}
              </li>
            </ul>
          </div>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li  onClick={() => setMenu(false)}>
              <Link href="/">
                <div>
                  <button
                    href=""
                    value="dashboard"
                    className={
                      "block py-2 pr-4 pl-3   md:border-0  md:p-0 dark:text-gray-400 " +
                      (tabs.dashboard ? "text-blue-700" : "text-gray-700")
                    }
                    onClick={(e) => handleClick(e)}
                  >
                    Dashboard
                  </button>
                </div>
              </Link>
            </li>
            <li  onClick={() => setMenu(false)}>
              <Link href="/portfolio">
                <button
                  href="#"
                  value="portfolio"
                  className={
                    "block py-2 pr-4 pl-3   md:border-0  md:p-0 dark:text-gray-400 " +
                    (tabs.portfolio ? "text-blue-700" : "text-gray-700")
                  }
                  onClick={(e) => handleClick(e)}
                >
                  Portfolio
                </button>
              </Link>
            </li>
            <li  onClick={() => setMenu(false)}>
              <Link href="/timeline">
                <button
                  href=""
                  value="timeline"
                  className={
                    "block py-2 pr-4 pl-3   md:border-0  md:p-0 dark:text-gray-400 " +
                    (tabs.timeline ? "text-blue-700" : "text-gray-700")
                  }
                  onClick={(e) => handleClick(e)}
                >
                  Timeline
                </button>
              </Link>
            </li>
            <li  onClick={() => setMenu(false)}>
              <Link href="/search">
                <button
                  href=""
                  value="search"
                  className={
                    "block py-2 pr-4 pl-3   md:border-0  md:p-0 dark:text-gray-400 " +
                    (tabs.search ? "text-blue-700" : "text-gray-700")
                  }
                  onClick={(e) => handleClick(e)}
                >
                  Search
                </button>
              </Link>
            </li>
            <li  onClick={() => setMenu(false)}>
              <Link href="/watchlist">
                <button
                  href=""
                  value="watchlist"
                  className={
                    "block py-2 pr-4 pl-3   md:border-0  md:p-0 dark:text-gray-400 " +
                    (tabs.watchlist ? "text-blue-700" : "text-gray-700")
                  }
                  onClick={(e) => handleClick(e)}
                >
                  Watchlist
                </button>
              </Link>
            </li>
            <li  onClick={() => setMenu(false)}>
              <Link href="/contact">
                <button
                  href=""
                  value="contact"
                  className={
                    "block py-2 pr-4 pl-3   md:border-0  md:p-0 dark:text-gray-400 " +
                    (tabs.contact ? "text-blue-700" : "text-gray-700")
                  }
                  onClick={(e) => handleClick(e)}
                >
                  Contact
                </button>
              </Link>
            </li>
            <li  onClick={() => setMenu(false)}>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 md:border-0  md:p-0 dark:text-gray-400 text-gray-700"
                onClick={() => setShowModal(true)}
              >
                Sign out
              </a>
              {showModal ? (
                <Modal
                  confirmMsg={handleLogout}
                  head="Confirm Sign Out?"
                  visible={showModal}
                  onClose={() => setShowModal(false)}
                >
                  Are you sure you want to sign out?
                </Modal>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
