import React, { useEffect } from "react";
import images from "~/assets/img";
import { Link } from "react-router-dom";

import { fetchTimeSpent } from "~/features/issues/TimeSpentSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/app/store";
import { groupIssuesByDate } from "~/utils/GroupByDate";

const SubOverview = () => {
  const dispatch: AppDispatch = useDispatch();
  const { timeSpent } = useSelector((state: RootState) => state.timeSpent); // Update state slice name

  useEffect(() => {
    if (timeSpent?.length === 0) {
      dispatch(fetchTimeSpent()); // Update action
    }
  }, [dispatch]);

  const groupedIssues = groupIssuesByDate(timeSpent);

  // total time
  const totalHours = Object.values(groupedIssues).reduce((sum, { totalHours }) => sum + totalHours, 0);
  return (
    <>
      <h3 className="text-xs text-[#666] font-semibold mt-3.5 mb-2.5">Spent time</h3>
      <p className="flex  items-center gap-1 text-xs">
        <img src={images.time} alt="time" />
        <span className="text-[#484848]">{totalHours.toFixed(2)} hours</span>
      </p>
      <p className="my-3 text-xs">
        <Link className="text-primary hover:underline hover:text-[#b2290f]" to="/projects/fresher-_-reactjs-fresher/time_entries/new">
          Log time
        </Link>{" "}
        |
        <Link className="text-primary hover:underline hover:text-[#b2290f]" to="/projects/fresher-_-reactjs-fresher/time_entries">
          Details
        </Link>{" "}
        |
        <Link className="text-primary hover:underline hover:text-[#b2290f]" to="/projects/fresher-_-reactjs-fresher/time_entries/report">
          Report
        </Link>
      </p>
    </>
  );
};

export default SubOverview;
