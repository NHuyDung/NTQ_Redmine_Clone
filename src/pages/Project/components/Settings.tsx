import React from "react";
import { Link } from "react-router-dom";
import images from "~/assets/img";

const Settings = () => {
  return (
    <div>
      <h2 className="text-xl text-[#555] mb-2.5 font-medium">Settings</h2>
      <ul className="flex items-center gap-2 text-xs font-semibold text-[#484848] px-2 border-b mb-4">
        <li className="bg-[#fff] relative top-[0.5px] border-t-1 border-x-1  rounded-tl-md rounded-tr-md p-1 z-100 cursor-pointer ">Versions</li>
      </ul>
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-[#eee]">
            <th className="border border-[#d7d7d7]">Version</th>
            <th className="border border-[#d7d7d7]">Date</th>
            <th className="border border-[#d7d7d7]">Description</th>
            <th className="border border-[#d7d7d7]">Status</th>
            <th className="border border-[#d7d7d7]">Sharing</th>
            <th className="border border-[#d7d7d7]">Wiki page</th>
            <th className="border border-[#d7d7d7]"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-[#169] hover:underline hover:text-[#b2290f] border border-[#d7d7d7] text-center">
              <Link to="/versions/1302" title="07/17/2024>ui-icons.png">
                fdsfd
              </Link>
            </td>
            <td className="border border-[#d7d7d7] text-center">07/17/2024</td>
            <td className="border border-[#d7d7d7] text-center">fsdfsdf</td>
            <td className="border border-[#d7d7d7] text-center">open</td>
            <td className="border border-[#d7d7d7] text-center">Not shared</td>
            <td className="text-[#169] hover:underline hover:text-[#b2290f] border border-[#d7d7d7] text-center">
              <Link to="/versions/1302" title="07/17/2024>ui-icons.png">
                fdsfs
              </Link>
            </td>
            <td className="flex items-center gap-1.5 justify-center border border-[#d7d7d7]">
              <Link to="/attachments/43995" className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]" rel="nofollow">
                <img alt="Delete" src={images.edit} />
                <span>Edit</span>
              </Link>
              <Link to="/attachments/43995" className="flex items-center gap-1 text-[#169] hover:underline hover:text-[#b2290f]" rel="nofollow">
                <img alt="Delete" src={images.remove} />
                <span>Delete</span>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
