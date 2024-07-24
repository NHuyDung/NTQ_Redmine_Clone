import React from "react";

const SpentTime = () => {
  return (
    <div className="flex items-center gap-1 font-bold">
      <a href="/time_entries" className="text-[#1c5d8b]  hover:underline hover:text-red-400">
        Spent time
      </a>
      <span className="text-[#555555]">(last 7 days)</span>
    </div>
  );
};

export default SpentTime;
