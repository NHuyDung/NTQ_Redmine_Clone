import React, { useState, useEffect } from "react";
import images from "~/assets/img";
import { getSpentTime } from "~/services/PageService";
import { SpentTimeType } from "~/types/MyPage";

import Select from "~/components/Select/Select";
import Detail from "./Detail";
import Report from "./Report";

const SpentTimeDetail = () => {
  const [spentTimeData, setSpentTimeData] = useState<SpentTimeType[]>([]);
  const [tabPage, setTabPage] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getSpentTime();
        setSpentTimeData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);

  const OPTIONS_DATE = [
    { value: "date1", label: "Date 1" },
    { value: "date2", label: "Date 2" },
    { value: "date3", label: "Date 3" },
  ];

  const OPTIONS_USER_1 = [
    { value: "user1", label: "User 1" },
    { value: "user2", label: "User 2" },
    { value: "user3", label: "User 3" },
  ];

  const OPTIONS_USER_2 = [
    { value: "user1", label: "User 1" },
    { value: "user2", label: "User 2" },
    { value: "user3", label: "User 3" },
  ];

  const OPTIONS_FILTER = [
    { value: "filter1", label: "Filter 1" },
    { value: "filter2", label: "Filter 2" },
    { value: "filter3", label: "Filter 3" },
  ];

  return (
    <div>
      <div className="flex justify-between my-1">
        <a className="text-primary text-11 hover:underline hover:text-red-400" href="my/page_layout">
          All projects »
        </a>
        <a href="/log-time" className="flex items-center gap-1 text-primary text-11 hover:underline hover:text-red-400">
          <img src={images.logtime} alt="add" />
          <span>Log time</span>
        </a>
      </div>
      <h1 className="text-[#555] text-xl font-semibold mb-3">Spent time</h1>
      <fieldset className="flex text-xs text-subText py-2 px-3 border-t">
        <legend className="flex items-center">
          <img src={images.arrow_down} alt="" />
          Filters
        </legend>
        <table className="max-w-[60%] w-full flex flex-col gap-1">
          <thead></thead>
          <tbody>
            <tr className="flex items-center mb-1">
              <td className="flex items-center gap-1 w-4/12">
                <input type="checkbox" id="date" />
                <label htmlFor="date">Date</label>
              </td>
              <td className="flex items-center gap-1 w-4/12">
                <Select
                  value="selectedValue"
                  className="h-6 text-xs text-black font-medium border border-[#d7d7d7] rounded-none"
                  onChange={() => {
                    return "selectedValue";
                  }}
                  options={OPTIONS_DATE}
                  label="Select an option"
                />
              </td>
              <td></td>
            </tr>
            <tr className="flex items-center mb-1">
              <td className="flex items-center gap-1 w-4/12">
                <input type="checkbox" id="user" />
                <label htmlFor="user">User</label>
              </td>
              <td className="flex items-center gap-1 w-3/12">
                <Select
                  value="selectedValue"
                  className="h-6 text-xs text-black font-medium border border-[#d7d7d7] rounded-none"
                  onChange={() => {
                    return "selectedValue";
                  }}
                  options={OPTIONS_USER_1}
                  label="Select an option"
                />
              </td>
              <td className="flex items-center gap-1 w-5/12">
                <Select
                  value="selectedValue"
                  className="h-6 text-xs text-black font-medium border border-[#d7d7d7] rounded-none w-full"
                  onChange={() => {
                    return "selectedValue";
                  }}
                  options={OPTIONS_USER_2}
                  label="Select an option"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="max-w-[40%] w-full flex justify-end items-start">
          <div className="flex items-center gap-1">
            <span className="text-nowrap">Add filter</span>
            <Select
              value="selectedValue"
              className="h-6 text-xs text-black max-w-[204px] w-full font-medium border border-[#d7d7d7] rounded-none mr-2"
              onChange={() => {
                return "selectedValue";
              }}
              options={OPTIONS_FILTER}
              label="Select an option"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="flex text-xs text-subText py-2 px-3 border-t">
        <legend className="flex items-center">
          <img src={images.arrow_down} alt="" />
          Options
        </legend>
      </fieldset>
      <div className="flex items-center gap-1 my-4">
        <span className="flex items-center gap-1 text-xs cursor-pointer text-primaryText hover:text-hoverText hover:underline">
          <img src={images.check} alt="check" />
          <span>Apply</span>
        </span>
        <span className="flex items-center gap-1 text-xs cursor-pointer text-primaryText hover:text-hoverText hover:underline">
          <img src={images.reload} alt="check" />
          <span>Clear</span>
        </span>
      </div>
      <ul className="flex items-center gap-2 text-xs font-semibold text-subText px-2 border-b">
        <li
          onClick={() => setTabPage(0)}
          className={`relative top-[0.5px] border-t-1 border-x-1  rounded-tl-md rounded-tr-md p-1 z-100 cursor-pointer ${tabPage === 0 ? "bg-[#fff]" : "bg-[#f6f6f6] text-[#999] hover:bg-[#ffffdd]"}`}
        >
          Detail
        </li>
        <li
          onClick={() => setTabPage(1)}
          className={`relative top-[0.5px] border-t-1 border-x-1  rounded-tl-md rounded-tr-md p-1 z-100 cursor-pointer ${tabPage === 1 ? "bg-[#fff]" : "bg-[#f6f6f6] text-[#999] hover:bg-[#ffffdd]"}`}
        >
          Report
        </li>
      </ul>
      <div>{tabPage === 0 ? <Detail data={spentTimeData} /> : <Report />}</div>
    </div>
  );
};

export default SpentTimeDetail;
