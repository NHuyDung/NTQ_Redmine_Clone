import React, { useEffect, useState } from "react";
import { Issue } from "~/types/Issue";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/app/store";
import { fetchIssuesReport } from "~/features/issues/IssuesReportSlice";
import { fetchIssuesAssigned } from "~/features/issues/IssuesAssignedSlice";
import { fetchIssuesWatched } from "~/features/issues/IssuesWatchedSlice";
import ModalDetail from "./ModalDetail";
import { Link } from "react-router-dom";

const getTableName = (id: string): string => {
  switch (id) {
    case "1":
      return "Issues assigned to me";
    case "2":
      return "Reported issues";
    case "3":
      return "Watched issues";
    default:
      return "Issues";
  }
};

const TableIssue: React.FC<{ id: string }> = ({ id }) => {
  const [modals, setModals] = useState<{ issue: Issue; mousePosition: { x: number; y: number } }[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const { issuesReport } = useSelector((state: RootState) => state.issuesReport);
  const { issuesWatched } = useSelector((state: RootState) => state.issuesWatched);
  const { issuesAssigned } = useSelector((state: RootState) => state.issuesAssigned);
  const tableName = getTableName(id);

  useEffect(() => {
    if (issuesReport?.length === 0) {
      dispatch(fetchIssuesReport());
    }
    if (issuesAssigned?.length === 0) {
      dispatch(fetchIssuesAssigned());
    }
    if (issuesWatched?.length === 0) {
      dispatch(fetchIssuesWatched());
    }
  }, [dispatch, issuesReport?.length, issuesAssigned?.length, issuesWatched?.length]);

  const onDoubleClick = (issue: Issue, event?: React.MouseEvent<HTMLTableRowElement>) => {
    if (event) {
      const { clientX, clientY } = event;
      const isIssueAlreadyOpen = modals.some((modal) => modal.issue.id === issue.id);
      if (!isIssueAlreadyOpen) {
        const newModal = { issue, mousePosition: { x: clientX, y: clientY } };
        setModals((prevModals) => [...prevModals, newModal]);
      }
    }
  };

  const closeModal = (issueToClose: Issue) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.issue.id !== issueToClose.id));
  };

  let displayedData: Issue[] = [];
  if (id === "1") {
    displayedData = issuesAssigned || [];
  } else if (id === "2") {
    displayedData = issuesReport || [];
  } else if (id === "3") {
    displayedData = issuesWatched || [];
  } else {
    displayedData = [];
  }

  return (
    <>
      <div className="text-start mb-2.5">
        <Link to="#" className="font-semibold  text-[#159]  hover:underline hover:text-[#c61a1a]" rel="noreferrer noopener">
          {tableName}
        </Link>
      </div>
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
                onDoubleClick={(e) => onDoubleClick(issue, e)}
              >
                <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border hover:underline">{issue.id}</td>
                <td className="p-1 text-center text-xs border border-primary-border hover:underline">{issue?.project?.name}</td>
                <td className="p-1 text-center text-xs border border-primary-border">{issue?.tracker?.name}</td>
                <td className="p-1 text-left text-xs border border-primary-border hover:underline">{issue?.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {modals.map((modalData, index) => (
          <ModalDetail key={index} modal={() => closeModal(modalData.issue)} issue={modalData.issue} mousePosition={modalData.mousePosition} />
        ))}
      </div>
    </>
  );
};

export default TableIssue;
