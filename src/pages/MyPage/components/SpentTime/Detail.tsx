import React, { useState, useEffect } from "react";
import images from "~/assets/img";
import { formatDate } from "~/utils/FormatDay";
import { TimeEntriesType } from "~/types/spentTime";
import { groupIssuesByDate } from "~/utils/GroupByDate";
import { HeaderDetailData } from "~/const/MyPage";
import { getIssueSchedule } from "~/services/IssueService";
import { Issue } from "~/types/Issue";

interface DetailProps {
  data: TimeEntriesType[];
}

const Detail: React.FC<DetailProps> = ({ data }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [sortOrder, setSortOrder] = useState<"up" | "down">("up");
  const [sortedData, setSortedData] = useState<TimeEntriesType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getIssueSchedule();
        setIssues(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const sorted = sortData(data, sortOrder);
    setSortedData(sorted);
  }, [data, sortOrder]);

  const sortData = (data: TimeEntriesType[], order: "up" | "down"): TimeEntriesType[] => {
    return data.slice().sort((a, b) => {
      const dateA = new Date(a.spent_on);
      const dateB = new Date(b.spent_on);
      return order === "up" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "up" ? "down" : "up");
  };

  // Group date
  const groupedIssues = groupIssuesByDate(data);

  // total time
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
              <th
                key={header.id}
                className="p-1 text-xs border border-primary-border cursor-pointer"
                onClick={header.label === "Date" ? handleSort : undefined}
              >
                {header.label}
                {header.label === "Date" && (
                  <img
                    src={sortOrder === "up" ? images.arrow_up : images.arrow_down}
                    alt={sortOrder === "up" ? "Sort up" : "Sort down"}
                    className="inline ml-1"
                  />
                )}
              </th>
            ))}
            <th className="p-1 text-xs border border-primary-border"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {sortedData.map((item, index) => {
            const issue = issues.find((issue) => issue.id === item.issue?.id);

            return (
              <tr className={index % 2 === 0 ? "bg-[#f6f7f9]" : "bg-[#fff]"} key={item.id}>
                <td className="p-1 text-left text-xs border border-primary-border">
                  <input type="checkbox" />
                </td>
                <td className="text-primary hover:underline hover:text-red-400 p-1 text-left text-xs border border-primary-border">
                  {item.project.name}
                </td>
                <td className="p-1 text-left text-xs border border-primary-border">{formatDate(item.spent_on, true)}</td>
                <td className="text-primary hover:underline hover:text-red-400 p-1 text-left text-xs border border-primary-border">
                  {item.user.name}
                </td>
                <td className="p-1 text-left text-xs border border-primary-border">{item.activity.name}</td>
                <td className=" p-1 text-left text-xs last:border-b border-primary-border flex gap-1">
                  {item.issue?.id ? (
                    <>
                      <a className="text-primary hover:underline hover:text-red-400" href="" rel="noreferrer noopener">
                        {issue ? `${issue.tracker.name} #${issue.id}:` : `Bug #${item.issue.id}:`}
                      </a>
                      <div className="">{issue ? issue.subject : "API issue"}</div>
                    </>
                  ) : (
                    <></>
                  )}
                </td>
                <td className="p-1 text-left text-xs border border-primary-border">{item.comments}</td>
                <td className="p-1 text-left text-xs border border-primary-border">{item.hours.toFixed(2)}</td>
                <td className="flex justify-center items-end pb-3 gap-1 p-1 text-xs border border-primary-border ">
                  <a href="" className="h-full" rel="noreferrer noopener">
                    <img src={images.edit} alt="edit" />
                  </a>
                  <a href="" className="h-full" rel="noreferrer noopener">
                    <img src={images.remove} alt="delete" />
                  </a>
                </td>
              </tr>
            );
          })}
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
