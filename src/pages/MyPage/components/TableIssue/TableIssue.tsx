import React, { useEffect, useState } from "react";
import { IssueReport } from "~/types/Issue";
import DetailsDialog from "./DetailsDialog";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "~/app/store";
import { fetchIssuesReport } from "~/features/issues/IssuesReportSlice";
import { useDispatch } from "react-redux";
import { fetchIssuesAssigned } from "~/features/issues/IssuesAssignedSlice";
import { fetchIssuesWatched } from "~/features/issues/IssuesWatchedSlice";

const TableIssue: React.FC<{ id: string }> = ({ id }) => {
  let displayedData: IssueReport[] = [];
  const dispatch: AppDispatch = useDispatch();
  const { issuesReport } = useSelector((state: RootState) => state.issuesReport);
  const { issuesWatched } = useSelector((state: RootState) => state.issuesWatched);
  const { issuesAssigned } = useSelector((state: RootState) => state.issuesAssigned);
  useEffect(() => {
    dispatch(fetchIssuesReport());
    dispatch(fetchIssuesAssigned());
    dispatch(fetchIssuesWatched());
  }, []);

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const toggleDialogVisibility = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  if (id === "1") {
    displayedData = issuesAssigned;
  } else if (id === "2") {
    displayedData = issuesReport;
  } else if (id === "3") {
    displayedData = issuesWatched;
  } else {
    displayedData = [];
  }

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
          {displayedData?.map((issue, index: number) => (
            <tr
              key={issue.id}
              className={`hover:bg-[#ffffdd] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f6f7f8]"}`}
              onDoubleClick={toggleDialogVisibility} // Thêm sự kiện nhấp đúp chuột
            >
              <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border hover:underline">{issue.id}</td>
              <td className="p-1 text-center text-xs border border-primary-border hover:underline">{issue?.project?.name}</td>
              <td className="p-1 text-center text-xs border border-primary-border">{issue?.tracker?.name}</td>
              <td className="p-1 text-left text-xs border border-primary-border hover:underline">{issue?.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDialogVisible && <DetailsDialog toggleDialogVisibility={toggleDialogVisibility} />}
    </div>
  );
};

export default TableIssue;
