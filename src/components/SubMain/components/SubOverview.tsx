import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import images from "~/assets/img";

const SubOverview = () => {
  const data = useSelector((state: RootState) => state.timeEntries.data);
  const totalHours = useSelector((state: RootState) => state.timeEntries.totalHours);

  // Debug: In ra giá trị tổng thời gian
  console.log("Total Hours:", totalHours);

  // Debug: In ra dữ liệu
  console.log("Data:", data);
  return (
    <>
      <h3 className="text-xs text-[#666] font-semibold mt-3.5 mb-2.5">Spent time</h3>
      <p className="flex  items-center gap-1 text-xs">
        <img src={images.time} alt="time" />
        <span className="">{totalHours.toFixed(2)} hours</span>
      </p>
      <p className="my-3 text-xs">
        <a className="text-primary hover:underline hover:text-[#b2290f]" href="/projects/fresher-_-reactjs-fresher/time_entries/new">
          Log time
        </a>{" "}
        |
        <a className="text-primary hover:underline hover:text-[#b2290f]" href="/projects/fresher-_-reactjs-fresher/time_entries">
          Details
        </a>{" "}
        |
        <a className="text-primary hover:underline hover:text-[#b2290f]" href="/projects/fresher-_-reactjs-fresher/time_entries/report">
          Report
        </a>
      </p>
    </>
  );
};

export default SubOverview;
