import React, { useState, useEffect } from "react";
import { Button, Container, LogoutBtn } from "../Index";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assests/Logo.png";
import defaultUser from "../../assests/user (2).png";
import {
  User,
  Home,
  PlusSquare,
  Info,
  LogIn,
  UserPlus,
  X,
  LogOut,
  Menu,
} from "lucide-react";

function Header() {
  const user = useSelector((state) => state.auth.status);
  const [isSideOpen, setIsSideOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: <Home className="w-5 h-5" />,
    },
    {
      name: "AddPost",
      slug: "/addPost",
      active: user,
      icon: <PlusSquare className="w-5 h-5" />,
    },
    {
      name: "About",
      slug: "/about",
      active: true,
      icon: <Info className="w-5 h-5" />,
    },
    {
      name: "SignUp",
      slug: "/signUp",
      active: !user,
      icon: <UserPlus className="w-5 h-5" />,
    },
    {
      name: "LogIn",
      slug: "/login",
      active: !user,
      icon: <LogIn className="w-5 h-5" />,
    },
  ];

  return (
    <Container
      className={`transition-all  ease-in-out z-50  sticky top-0 bg-[#FBFBFB]`}
    >
      <header>
        <nav
          className={`flex justify-between items-center py-4 px-5 border-b-[1px] border-gray-100`}
        >
          <div>
            <Link to="/">
              <img src={logo} width={120} alt="Blogify Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex gap-6 items-center font-semibold tracking-wide text-[14.5px]">
            {navItems.map((item) =>
              item.active ? (
                item.name === "LogIn" ? (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      `flex items-center gap-1 ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600"
                      } rounded-sm py-[2px] px-3 border-[2px] border-blue-600 transition-colors`
                    }
                  >
                    {item.name}
                  </NavLink>
                ) : (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-2 py-1 ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-500 hover:text-blue-500"
                      } transition-colors`
                    }
                  >
                    {item.name}
                  </NavLink>
                )
              ) : null
            )}

            {user && (
              <NavLink
                to="/myAccount"
                className={({ isActive }) =>
                  `p-1.5 rounded-full ${
                    isActive
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  } transition-colors`
                }
              >
                <User className="w-5 h-5" />
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-1 px-2 rounded-md text-gray-500 hover:bg-gray-100"
            onClick={() => setIsSideOpen(true)}
          >
            <Menu className="text-[#234DA1] font-extrabold h-9" />
          </button>

          {/* Mobile Sidebar */}
          {isSideOpen && (
            <div className="fixed inset-0 z-50">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black/30"
                onClick={() => setIsSideOpen(false)}
              />

              {/* Sidebar Content */}
              <div
                className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl flex flex-col  transform transition-transform duration-300 ease-in-out ${
                  isSideOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {/* Sidebar Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                  <Link to="/" onClick={() => setIsSideOpen(false)}>
                    <img src={logo} width={120} alt="Blogify Logo" />
                  </Link>
                  <button
                    onClick={() => setIsSideOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                {/* User Profile */}
                {user && (
                  <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                    <img
                      src={user.photoURL || defaultUser}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {user.displayName || "My Account"}
                      </p>
                      <NavLink
                        to="/myAccount"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => setIsSideOpen(false)}
                      >
                        View Profile
                      </NavLink>
                    </div>
                  </div>
                )}

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-2">
                    {navItems.map(
                      (item) =>
                        item.active && (
                          <li key={item.name}>
                            <NavLink
                              to={item.slug}
                              className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium ${
                                  isActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                                } transition-colors`
                              }
                              onClick={() => setIsSideOpen(false)}
                            >
                              <span
                                className={`p-1.5 rounded-md 
                                   "bg-blue-100" 
                                  `}
                              >
                                {item.icon}
                              </span>
                              {item.name}
                            </NavLink>
                          </li>
                        )
                    )}
                  </ul>
                </div>

                {/* Logout Button (if logged in) */}
                {user && (
                  <div className="p-4 border-t border-gray-100">
                    <LogoutBtn
                      onClick={() => {
                        setIsSideOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                      <span className="p-1.5 rounded-md bg-red-100">
                        <LogOut className="w-5 h-5" />
                      </span>
                      Log Out
                    </LogoutBtn>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>
    </Container>
  );
}

export default Header;
