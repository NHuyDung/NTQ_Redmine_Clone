import React from "react";
import images from "~/assets/img";

import Select from "~/components/Select/Select";

const OPTIONS_TIME = [
  { value: "year", label: "Year", hidden: true },
  { value: "month", label: "Month" },
  { value: "week", label: "Week" },
  { value: "days", label: "Days" },
];

const OPTIONS_ADD = [
  { value: "project", label: "Project" },
  { value: "status", label: "Status" },
  { value: "version", label: "Version" },
  { value: "category", label: "Category" },
];

const Report = () => {
  return (
    <div className="flex items-center text-xs gap-1 my-3">
      <label className=" text-[#505050] ">Details:</label>
      <Select
        value="selectedValue"
        className="h-6 text-xs text-black font-medium border border-[#d7d7d7] rounded-none"
        onChange={() => {
          return "selectedValue";
        }}
        options={OPTIONS_TIME}
        label="Select an option"
      />

      <label className=" text-[#505050] ">Add:</label>
      <Select
        value="selectedValue"
        className="min-w-[210px] h-6 text-xs text-black font-medium border border-[#d7d7d7] rounded-none"
        onChange={() => {
          return "selectedValue";
        }}
        options={OPTIONS_ADD}
        label="Select an option"
      />

      <a className="flex items-center gap-1 text-primary text-11 hover:underline hover:text-red-400" href="my/page_layout">
        <img src={images.reload} alt="reload" />
        Clear
      </a>
    </div>
  );
};

export default Report;
