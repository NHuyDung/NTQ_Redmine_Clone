import React from "react";
import images from "~/assets/img";

const SubOverview = () => {
  return (
    <div className="">
      <h3 className="text-xs text-[#666] font-semibold mt-3.5 mb-2.5">Spent time</h3>
      <p className="flex  items-center gap-1 text-xs">
        <img src={images.time} alt="time" />
        <span className="">1337.00 hours</span>
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
    </div>
  );
};

export default SubOverview;
