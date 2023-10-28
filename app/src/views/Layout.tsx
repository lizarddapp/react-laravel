import React from "react";
import { Link, Outlet } from "react-router-dom";
import MyToast from "../components/MyToast";
import { useLogout, useMe } from "../hooks/auth";

const Layout = () => {
  const { isAuthed } = useMe();

  const { logout } = useLogout();

  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-white text-2xl font-semibold cursor-pointer"
          >
            My App
          </Link>
          <div>
            {isAuthed ? (
              <a
                onClick={() => {
                  logout();
                }}
                className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
              >
                Logout
              </a>
            ) : (
              <Link
                to="/login"
                className="bg-white text-blue-500 px-4 py-2 rounded-md mr-2"
              >
                Login
              </Link>
            )}
            <Link
              to="register"
              className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
            >
              Register
            </Link>

            <Link
              to="users"
              className="bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              User List
            </Link>
          </div>
        </div>
      </nav>
      <div className="max-w-screen-lg mx-auto ">
        <div className="mx-4 mt-4">
          <Outlet />
        </div>

        <MyToast />
      </div>
    </>
  );
};

export default Layout;
