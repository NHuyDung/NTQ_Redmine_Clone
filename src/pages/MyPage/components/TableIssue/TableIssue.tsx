import React, { useState } from "react";
import { IssueReport } from "~/types/Issue";
import DetailsDialog from "./DetailsDialog";

const TableIssue: React.FC<{ data: IssueReport[] | [] }> = ({ data }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const toggleDialogVisibility = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-gray-200 border border-gray-300">
        <thead className="bg-primary-sub_bg h-7">
          <tr>
            <th scope="col" className="p-1 text-xs border border-primary-border">
              #
            </th>
            <th scope="col" className="p-1 text-xs border border-primary-border">
              Project
            </th>
            <th scope="col" className="p-1 text-xs border border-primary-border">
              Tracker
            </th>
            <th scope="col" className="p-1 text-xs border border-primary-border">
              Subject
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {data?.map((issue, index: number) => (
            <tr
              key={issue.id}
              className={`hover:bg-[#ffffdd] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f6f7f8]"}`}
              onDoubleClick={toggleDialogVisibility} // Thêm sự kiện nhấp đúp chuột
            >
              <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border">{issue.id}</td>
              <td className="p-1 text-center text-xs border border-primary-border">{issue?.project?.name}</td>
              <td className="p-1 text-center text-xs border border-primary-border">{issue?.tracker?.name}</td>
              <td className="p-1 text-left text-xs border border-primary-border">{issue?.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDialogVisible && <DetailsDialog toggleDialogVisibility={toggleDialogVisibility} />}
    </div>
  );
};

export default TableIssue;
