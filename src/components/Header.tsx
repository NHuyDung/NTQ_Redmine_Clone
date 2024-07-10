import React from "react";

const Header = () => {
  return (
    <div className="min-w-[900px]">
      <div className=" flex items-center justify-between p-2 bg-primary-dark h-5 text-xs">
        <ul className="flex text-white gap-2 font-bold ">
          <li className="">Home</li>
          <li className="">My page</li>
          <li className="">Projects</li>
          <li className="">Help</li>
        </ul>
        <ul className="flex text-white gap-2 font-bold">
          <li className="font-normal">
            Logged in as
            <a href="" className="ml-1 font-bold">
              duc.nguyen14@ntq-solution.com.vn
            </a>
          </li>
          <li className="">WorkTime</li>
          <li className="">My account</li>
          <li className="">Sign out</li>
        </ul>
      </div>

      <div className="flex justify-between h-[88px] items-start text-white bg-primary pt-1 pl-[6px] pr-2 pb-5 ">
        <h1 className="text-2xl font-bold">NTQ Redmine</h1>
        <div className="flex gap-2 text-black">
          <div>
            <label className="text-white pr-2" htmlFor="search">
              Search:
            </label>
            <input className=" outline-none" type="text" name="search" id="search" />
          </div>
          <div>
            <select className="outline-none">
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
