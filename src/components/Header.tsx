import React from "react";

const Header = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between p-2 bg-[#3d5b75] h-5 text-xs">
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

      <div className="flex justify-between h-[88px] items-start text-white bg-[#628db7] pt-1 pl-[6px] pr-2 pb-5 ">
        <h1 className="text-2xl font-bold">NTQ Redmine</h1>
        <div className="flex gap-1 justify-center items-center text-sm">
          <label htmlFor="search">Search:</label>
          <input className="flex justify-center items-center h-5 p-[2px]  text-black" type="text" id="search" />
          <select
            className="flex justify-center items-center h-5 min-w-48 border-solid border-[#d7d7d7] border-[1px] p-[2px] text-black placeholder-gray-500 "
            id="project"
          >
            <option className="text-black" value="">
              Jump to a project...
            </option>
            <option className="text-black" value="no">
              _ _ _
            </option>
            <option className="text-black" value="reactjs">
              [Fresher]__ReactJS
            </option>
            <option className="text-black" value="others">
              Khác
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
