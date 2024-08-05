import React, { useEffect, useState, useContext } from "react";
import { Issue } from "~/types/Issue";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/app/store";
import { fetchIssuesReport } from "~/features/issues/IssuesReportSlice";
import { fetchIssuesAssigned } from "~/features/issues/IssuesAssignedSlice";
import { fetchIssuesWatched } from "~/features/issues/IssuesWatchedSlice";
import ModalDetail from "./ModalDetail";
import { Link } from "react-router-dom";
import { ZIndexContext } from "./ModalContext";
import { RingLoader } from "react-spinners";
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
  let displayedData: Issue[] = [];
  let loading = false;
  const [modals, setModals] = useState<{ issue: Issue; mousePosition: { x: number; y: number }; zIndex: number }[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const tableName = getTableName(id);
  const { zIndexCounter, incrementZIndex } = useContext(ZIndexContext);
  const { issuesReport, loading: loadingReport } = useSelector((state: RootState) => state.issuesReport);
  const { issuesWatched, loading: loadingWatched } = useSelector((state: RootState) => state.issuesWatched);
  const { issuesAssigned, loading: loadingAssigned } = useSelector((state: RootState) => state.issuesAssigned);

  useEffect(() => {
    if (id === "1" && issuesReport?.length === 0) {
      dispatch(fetchIssuesAssigned());
    } else if (id === "2" && issuesReport?.length === 0) {
      dispatch(fetchIssuesReport());
    } else if (id === "3" && issuesWatched?.length === 0) {
      dispatch(fetchIssuesWatched());
    }
  }, []);

  const onDoubleClick = (issue: Issue, event?: React.MouseEvent<HTMLTableRowElement>) => {
    if (event) {
      const { clientX, clientY } = event;
      const isIssueAlreadyOpen = modals.some((modal) => modal.issue.id === issue.id);
      if (!isIssueAlreadyOpen) {
        incrementZIndex();

        const newModal = {
          issue,
          mousePosition: { x: clientX, y: clientY },
          zIndex: zIndexCounter,
        };
        setModals((prevModals) => [...prevModals, newModal]);
      }
    }
  };

  const bringToFront = (id: number) => {
    incrementZIndex();
    setModals((prevModals) => {
      const updatedModals = prevModals.map((modal) => (modal.issue.id === id ? { ...modal, zIndex: zIndexCounter } : modal));
      return updatedModals;
    });
  };

  const closeModal = (issueToClose: Issue) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.issue.id !== issueToClose.id));
  };
  if (id === "1") {
    displayedData = issuesAssigned || [];
    loading = loadingAssigned;
  } else if (id === "2") {
    displayedData = issuesReport || [];
    loading = loadingReport;
  } else if (id === "3") {
    displayedData = issuesWatched || [];
    loading = loadingWatched;
  }

  return (
    <>
      <div className="text-start">
        <Link to="#" className="text-[#1c5d8b] hover:underline hover:text-red-400" rel="noreferrer noopener">
          {tableName}
        </Link>
      </div>
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <RingLoader color="#34d2c8" speedMultiplier={2} />
          </div>
        ) : (
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
              {displayedData?.map((issue, index: number) => {
                // Xác định màu nền của hàng dựa trên priority.name
                const rowBgColor =
                  issue.priority?.name === "Urgent" || issue.priority?.name === "Immediate"
                    ? "bg-[#ffc4c4]"
                    : index % 2 === 0
                      ? "bg-[#ffffff]"
                      : "bg-[#f6f7f8]";
                return (
                  <tr key={issue.id} className={`hover:bg-[#ffffdd] ${rowBgColor}`} onDoubleClick={(e) => onDoubleClick(issue, e)}>
                    <td className="p-1 text-center text-xs font-medium text-gray-900 border border-primary-border hover:underline">{issue.id}</td>
                    <td className="p-1 text-center text-xs border border-primary-border hover:underline">{issue?.project?.name}</td>
                    <td className="p-1 text-center text-xs border border-primary-border">{issue?.tracker?.name}</td>
                    <td className="p-1 text-left text-xs border border-primary-border hover:underline">{issue?.subject}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {modals.map((modalData, index) => (
          <ModalDetail
            key={index}
            modal={() => closeModal(modalData.issue)}
            issue={modalData.issue}
            mousePosition={modalData.mousePosition}
            zIndex={modalData.zIndex}
            onClick={() => bringToFront(modalData.issue.id)}
          />
        ))}
      </div>
    </>
  );
};

export default TableIssue;
