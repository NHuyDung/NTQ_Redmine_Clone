import React from "react";
import images from "~/assets/img";
import { formatDate } from "~/utils/FormatDay";
import { TimeEntriesType } from "~/types/MyPage";
import { groupIssuesByDate } from "~/utils/GroupByDate";
import { HeaderDetailData } from "~/const/MyPage";

interface DetailProps {
  data: TimeEntriesType[];
}

const Detail: React.FC<DetailProps> = ({ data }) => {
  console.log(data);
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
            <th className="p-1 text-xs border border-primary-border"></th>
            {HeaderDetailData.map((header) => (
              <th key={header.id} className="p-1 text-xs border border-primary-border">
                {header.label}
              </th>
            ))}
            <th className="p-1 text-xs border border-primary-border"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-1 text-left text-xs border border-primary-border">
                <input type="checkbox" />
              </td>
              <td className="text-primary hover:underline hover:text-red-400 p-1 text-left text-xs border border-primary-border">
                {item.project.name}
              </td>
              <td className="p-1 text-left text-xs border border-primary-border">{formatDate(item.spent_on)}</td>
              <td className="text-primary hover:underline hover:text-red-400 p-1 text-left text-xs border border-primary-border">{item.user.name}</td>
              <td className="p-1 text-left text-xs border border-primary-border">{item.activity.name}</td>
              <td className=" p-1 text-left text-xs last:border-b border-primary-border flex gap-1">
                <a className="text-primary hover:underline hover:text-red-400" href="" rel="noreferrer noopener">
                  Bug #122815:
                </a>
                <div className=""> API issue</div>
              </td>
              <td className="p-1 text-left text-xs border border-primary-border">{item.comments}</td>
              <td className="p-1 text-left text-xs border border-primary-border">{item.hours}</td>
              <td className="flex justify-center items-end pb-3 gap-1 p-1 text-xs border border-primary-border ">
                <a href="" className="h-full" rel="noreferrer noopener">
                  <img src={images.edit} alt="edit" />
                </a>
                <a href="" className="h-full" rel="noreferrer noopener">
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
        <a className="flex items-center gap-1 text-primary hover:underline hover:text-red-400" href="" rel="noreferrer noopener">
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
