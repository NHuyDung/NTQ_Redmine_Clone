import React, { useState, useEffect } from "react";
import images from "~/assets/img";

import { formatDate } from "~/utils/FormatDay";
import { getTotalTime } from "~/services/PageService";
import { TimeEntriesType } from "~/types/MyPage";
import { groupIssuesByDate } from "~/utils/GroupByDate";

// interface GroupedIssues {
//   [date: string]: {
//     issues: TimeEntriesType[];
//     totalHours: number;
//   };
// }

// const groupIssuesByDate = (issues: TimeEntriesType[]): GroupedIssues => {
//   return issues.reduce((acc: GroupedIssues, issue: TimeEntriesType) => {
//     const date = issue.spent_on;
//     if (!acc[date]) {
//       acc[date] = { issues: [], totalHours: 0 };
//     }
//     acc[date].issues.push(issue);
//     acc[date].totalHours += issue.hours;
//     return acc;
//   }, {});
// };

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
        <a href="/log-time" className="flex items-center gap-1 text-primary text-11 hover:underline hover:text-red-400">
          <img src={images.add} alt="add" />
          <span>Log time</span>
        </a>
      </div>
      <table className="min-w-full divide-gray-200 border border-gray-300">
        <thead className="bg-[#eeeeee] h-7">
          <tr>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Date
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Activity
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Project
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Comment
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Hours
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {Object.keys(groupedIssues).map((date) => {
            // console.log(`Issues for date ${date}:`, groupedIssues[date]);

            return (
              <React.Fragment key={date}>
                <tr className={"hover:bg-[#ffffdd] bg-[#f6f7f8]"}>
                  <td className="p-1 text-center text-xs font-medium text-gray-900 border border-[#dcdcdc]">{formatDate(date)}</td>
                  <td colSpan={2} className="col-span p-1 text-left text-xs border border-[#dcdcdc]"></td>
                  <td className="p-1 text-center text-xs border border-[#dcdcdc]">{groupedIssues[date].totalHours.toFixed(2)}</td>
                  <td className="p-1 text-center text-xs border border-[#dcdcdc]"></td>
                </tr>
                {groupedIssues[date].issues.map((issue) => (
                  <tr key={issue.id} className={"hover:bg-[#ffffdd]"}>
                    <td className="p-1 text-center text-xs font-medium text-gray-900 border border-[#dcdcdc]">{issue.activity.name}</td>
                    <td className="p-1 text-left text-xs border border-[#dcdcdc]">{issue.project.name}</td>
                    <td className="p-1 text-left text-xs border border-[#dcdcdc]">{issue.comments}</td>
                    <td className="p-1 text-center text-xs border border-[#dcdcdc]">{issue.hours.toFixed(2)}</td>
                    <td className="flex justify-center gap-1 p-1 text-xs border border-[#dcdcdc]">
                      <a href="">
                        <img src={images.edit} alt="edit" />
                      </a>
                      <a href="">
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
