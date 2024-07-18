import React from "react";
// import TableIssue from "./TableIssue";
// import Schedule from "./Schedule";
import TotalTime from "./TotalTime";
// import SpentTime from "./SpentTime";

const MyPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-[#555] text-lg text-5 font-semibold">My page</h2>
        <a className="text-primary" href="my/page_layout">
          Personalize this page
        </a>
      </div>
      {/* <TableIssue/>
      <Schedule/>
      {/* <SpentTime/> */}
      <TotalTime />
    </div>
  );
};

export default MyPage;
