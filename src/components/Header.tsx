import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between ">
      <ul className="flex text-white gap-2 font-bold">
        <li className="text-#fff">Home</li>
        <li className="text-#fff">My page</li>
        <li className="text-#fff">Projects</li>
        <li className="text-#fff">Help</li>
      </ul>
      <ul className="flex justify-between">
        <li className="text-#fff">
          Logged in as
          <a href="">duc.nguyen14@ntq-solution.com.vn</a>
        </li>
        <li className="text-#fff">WorkTime</li>
        <li className="text-#fff">My account</li>
        <li className="text-#fff">Sign out</li>
      </ul>
    </div>
  );
};

export default Header;
