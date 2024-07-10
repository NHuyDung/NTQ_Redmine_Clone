import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
    <div className="min-w-[900px]">
      <div className=" flex items-center justify-between p-2 bg-primary-dark h-5 text-xs">
        <ul className="flex text-white gap-2 font-bold ">
          {menuItems.map((item, index) => (
            <Link key={index} to={item.href} className="hover:underline duration-150 cursor-pointer list-none">
              {item.label}
            </Link>
          ))}
        </ul>
        <ul className="flex text-white gap-2 font-bold">
          <li className="font-normal">
            Logged in as
            <Link to="" className="ml-1 font-bold hover:underline duration-150 cursor-pointer">
              duc.nguyen14@ntq-solution.com.vn
            </Link>
          </li>
          {menuItems2.map((item, index) => (
            <Link key={index} to={item.href} className="hover:underline duration-150 cursor-pointer list-none">
              {item.label}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex justify-between h-[88px] items-start text-white bg-primary pt-1 pl-[6px] pr-2 pb-5 ">
        <h1 className="text-2xl font-bold">NTQ Redmine</h1>
        <div className="flex gap-2 text-black text-sm">
          <div>
            <label className="text-white pr-2" htmlFor="search">
              Search:
            </label>
            <input className="" type="text" name="search" id="search" />
          </div>
          <div>
            <select className="text-black">
              <option value="" disabled selected>
                Jump to a project...
              </option>
              <option value="redmine">Redmine</option>
              <option value="fresher">[Fresher]_ ReactJS Fresher</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
