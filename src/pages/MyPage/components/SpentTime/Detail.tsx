import React from "react";
import images from "~/assets/img";
import { formatDate } from "~/utils/FormatDay";
import { TimeEntriesType } from "~/types/MyPage";
import { groupIssuesByDate } from "~/utils/GroupByDate";

interface DetailProps {
  data: TimeEntriesType[];
}

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

const HeaderDetailData = [
  { id: 1, label: "Project" },
  { id: 2, label: "Date" },
  { id: 3, label: "User" },
  { id: 4, label: "Activity" },
  { id: 5, label: "Issue" },
  { id: 6, label: "Comment" },
  { id: 7, label: "Hours" },
];

const Detail: React.FC<DetailProps> = ({ data }) => {
  const groupedIssues = groupIssuesByDate(data);

  const totalHours = Object.values(groupedIssues).reduce((sum, { totalHours }) => sum + totalHours, 0);

  return (
    <div>
      <h2 className="text-13 my-3 font-bold">
        Total time:<span> {totalHours.toFixed(2)}</span>
      </h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="p-1 text-xs border border-[#dcdcdc]"></th>
            {HeaderDetailData.map((header) => (
              <th key={header.id} className="p-1 text-xs border border-[#dcdcdc]">
                {header.label}
              </th>
            ))}
            <th className="p-1 text-xs border border-[#dcdcdc]"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">
                <input type="checkbox" />
              </td>
              <td className="text-primary hover:underline hover:text-red-400 p-1 text-left text-xs border border-[#dcdcdc]">{item.project.name}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{formatDate(item.spent_on)}</td>
              <td className="text-primary hover:underline hover:text-red-400 p-1 text-left text-xs border border-[#dcdcdc]">{item.user.name}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.activity.name}</td>
              <td className=" p-1 text-left text-xs last:border-b border-[#dcdcdc] flex gap-1">
                <a className="text-primary hover:underline hover:text-red-400" href="">
                  Bug #122815:
                </a>
                <div className=""> API issue</div>
              </td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.comments}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.hours}</td>
              <td className="flex justify-center items-end pb-3 gap-1 p-1 text-xs border border-[#dcdcdc] ">
                <a href="" className="h-full">
                  <img src={images.edit} alt="edit" />
                </a>
                <a href="" className="h-full">
                  <img src={images.remove} alt="delete" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-11 text-[#484848] my-2">(1-15)/15</div>

      <div className="flex items-center gap-1 justify-end text-11 mb-2">
        <span>Also available in: CSV</span>
        <a className="flex items-center gap-1 text-primary hover:underline hover:text-red-400" href="">
          <img src={images.feed} alt="feed" />
          Atom
        </a>
        <span>|</span>
        <a href="" className="text-primary  text-11 hover:underline hover:text-red-400">
          CSV
        </a>
      </div>
    </div>
  );
};

export default Detail;
