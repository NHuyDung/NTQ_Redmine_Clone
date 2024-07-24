import React, { useState, useEffect } from "react";
import images from "~/assets/img";

import { formatDate } from "~/utils/FormatDay";
import { getTotalTime } from "~/services/PageService";
import { TimeEntriesType } from "~/types/MyPage";
import { groupIssuesByDate } from "~/utils/GroupByDate";
import { HeaderTotalData } from "~/const/MyPage";

const TotalTime: React.FC = () => {
  const [totalTimeData, setTotalTimeData] = useState<TimeEntriesType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getTotalTime();
        setTotalTimeData(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);

  // data table
  const groupedIssues = groupIssuesByDate(totalTimeData);

  // total time
  const totalHours = Object.values(groupedIssues).reduce((sum, { totalHours }) => sum + totalHours, 0);

  return (
    <div>
      <div className="flex justify-between my-3">
        <h2 className="text-13">
          Total time:<span>{totalHours.toFixed(2)}</span>
        </h2>
        <a href="/log-time" className="flex items-center gap-1 text-primary text-11 hover:underline hover:text-red-400" rel="noreferrer noopener">
          <img src={images.add} alt="add" />
          <span>Log time</span>
        </a>
      </div>
      <table className="min-w-full divide-gray-200 border border-gray-300">
        <thead className="bg-primary-sub_bg h-7">
          <tr>
            {HeaderTotalData.map((data) => (
              <th key={data.id} className="p-1 text-xs border border-primary-border">
                {data.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {Object.keys(groupedIssues).map((date) => {
            return (
              <React.Fragment key={date}>
                <tr className={"hover:bg-[#ffffdd] bg-[#f6f7f8]"}>
                  <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border">{formatDate(date)}</td>
                  <td colSpan={2} className="col-span p-1 text-left text-xs border border-primary-border"></td>
                  <td className="p-1 text-center text-xs border border-primary-border">{groupedIssues[date].totalHours.toFixed(2)}</td>
                  <td className="p-1 text-center text-xs border border-primary-border"></td>
                </tr>
                {groupedIssues[date].issues.map((issue) => (
                  <tr key={issue.id} className={"hover:bg-[#ffffdd]"}>
                    <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border">{issue.activity.name}</td>
                    <td className="p-1 text-left text-xs border border-primary-border">{issue.project.name}</td>
                    <td className="p-1 text-left text-xs border border-primary-border">{issue.comments}</td>
                    <td className="p-1 text-center text-xs border border-primary-border">{issue.hours.toFixed(2)}</td>
                    <td className="flex justify-center gap-1 p-1 text-xs border border-primary-border">
                      <a href="" rel="noreferrer noopener">
                        <img src={images.edit} alt="edit" />
                      </a>
                      <a href="" rel="noreferrer noopener">
                        <img src={images.remove} alt="delete" />
                      </a>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TotalTime;
