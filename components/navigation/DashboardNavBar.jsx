import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { dashboardNavLinks, navLinks } from "../../helpers/data";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { authenticatedUser, isLoggedIn, logout } from "../../redux/features/auth.slice";
import { LogoutIcon } from "@heroicons/react/outline";

const DashboardNavbar = ({ pathname }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    location.assign("/login");
  };

  useEffect(() => {
    if (authenticatedUser()) {
      setUserData(authenticatedUser());
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-between h-full relative py-6 overflow-y-auto">
      <div>
        <div className="flex justify-between items-center gap-2 p-3 mx-5 lg:mx-8">
          <img src="/logo.png" alt="Mooveit" className="max-h-8" />
        </div>

        <div className="flex flex-col mt-8">
          {dashboardNavLinks?.map(
            ({ path, title, icon, iconActive, permission }, i) =>
              permission.includes(userData?.role) && (
                <Link key={i} href={path}>
                  <a
                    className={`flex gap-5 items-center px-7 lg:px-10 py-2 mb-2 w-full hover:text-primary ${
                      pathname?.includes(path)
                        ? "text-primary font-semibold border-r-2 border-primary"
                        : "text-[#222222]"
                    }`}>
                    <p className="w-6">{pathname?.includes(path) ? iconActive : icon}</p>
                    <h2 className="text-sm">{title}</h2>
                  </a>
                </Link>
              )
          )}
        </div>
      </div>

      <div
        className="flex justify-between item gap-2 mx-5 lg:mx-8 text-sm cursor-pointer dropdown dropdown-top"
        tabIndex="0">
        <div className="flex gap-4 items-center">
          <span className="w-8 h-8 rounded-full bg-[#C4C4C4]"></span>
          <div>
            <h2 className="text-[#222222]">
              {userData?.firstName} {userData?.lastName}
            </h2>
            <h2 className="text-xs text-[#AAAAAA]">{userData?.email}</h2>
          </div>
        </div>
        <ChevronDownIcon className="w-4" />

        {/* dropdown content */}
        <ul tabIndex="0" className="dropdown-content menu mb-3 p-2 w-full border shadow bg-base-100 divide-y">
          <li className="hover:text-primary" onClick={handleLogout}>
            <span>
              <LogoutIcon className="w-6 h-6" /> Log out
            </span>
          </li>
        </ul>
        {/* dropdown content */}
      </div>
    </div>
  );
};

export default DashboardNavbar;
