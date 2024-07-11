import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isProjectOverviewPage = location.pathname === "/projects/overview";

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "My page", href: "/my-page" },
    { label: "Projects", href: "/projects" },
    { label: "Help", href: "/help" },
  ];

  const menuItems2 = [
    { label: "WorkTime", href: "/work-time" },
    { label: "My account", href: "/my-account" },
    { label: "Sign out", href: "/sign-out" },
  ];

  return (
    <div className="">
      <div className=" flex items-center justify-between p-2 bg-primary-dark h-5 text-10">
        <ul className="flex text-white gap-2 font-bold ">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.href} className="hover:underline duration-150 list-none">
              {item.label}
            </Link>
          ))}
        </ul>
        <ul className="flex text-white gap-2 font-bold">
          <li className="font-normal">
            Logged in as
            <a href="" className="ml-1 font-bold">
              duc.nguyen14@ntq-solution.com.vn
            </a>
          </li>
          {menuItems2.map((item, index) => (
            <Link key={index} to={item.href} className="hover:underline duration-150 list-none">
              {item.label}
            </Link>
          ))}
        </ul>
      </div>

      <div className="h-88  text-white bg-primary ">
        <div className="flex justify-between items-start pt-1 px-2 pb-5 ">
          <h1 className="text-2xl font-bold">NTQ Redmine</h1>
          <div className="flex gap-2 text-black text-sm">
            <label className="text-white pr-2" htmlFor="search">
              Search:
            </label>
            <input id="search" className="" type="text" name="search" />
            <select className="text-black text-xs">
              <option value="" disabled selected>
                Jump to a project...
              </option>
              <option value="redmine">Redmine</option>
              <option value="fresher">[Fresher]_ ReactJS Fresher</option>
            </select>
          </div>
        </div>

        {isProjectOverviewPage && <label className="text-white pl-2 mt-1">You are viewing the project overview</label>}
      </div>
    </div>
  );
};

export default Header;
