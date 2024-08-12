import React from "react";
import Draggable from "react-draggable";
import "./ModalDetail.css";
import images from "~/assets/img";
import { Link } from "react-router-dom";
import { Issue } from "~/types/Issue";
import moment from "moment";
interface IDragProps {
  modal: (issue: Issue) => void;
  issue: Issue;
  mousePosition: { x: number; y: number };
  zIndex: number;
  onClick: () => void;
}
const ModalDetail: React.FC<IDragProps & { zIndex: number; onClick: () => void }> = ({ modal, issue, mousePosition, zIndex, onClick }) => {
  const modalWidth = 600;
  const modalHeight = 650;
  const calculatePosition = () => {
    const viewportHeight = window.innerHeight;
    let left = mousePosition.x - modalWidth;
    let top = mousePosition.y - modalHeight / 2;
    if (left < 0) {
      left = mousePosition.x;
    }
    if (top < 0) {
      top = 0;
    }
    if (top + modalHeight > viewportHeight) {
      top = viewportHeight - modalHeight;
    }
    return { left, top };
  };
  const { left, top } = calculatePosition();
  const modalStyle = {
    left: `${left}px`,
    top: `${top}px`,
    width: `${modalWidth}px`,
    height: `${modalHeight}px`,
    zIndex: zIndex,
  };

  const createdTimeAgo = moment(issue.created_on).fromNow();
  const getFieldValue = (fields: { id: number; name: string; value: string; multiple?: boolean }[] | undefined, fieldName: string) => {
    if (!fields) return "-";
    const field = fields.find((field) => field.name === fieldName);
    return field ? field.value : "-";
  };

  return (
    <Draggable onMouseDown={() => onClick()}>
      <div className="bg-white fixed border rounded" style={modalStyle}>
        <div className="flex justify-between items-center bg-header m-1 bg-[#8db0d8]">
          <h2 style={{ marginRight: "auto" }} className="text-xs p-2 text-white font-bold">
            Quick View - #{issue.id} {issue.subject}
          </h2>
          <button onClick={() => modal(issue)} className="icon bg-[#fff] w-5 h-5 rounded-sm me-1"></button>
        </div>
        <div className="detail overflow-auto h-[600px]">
          <div className="bg-[#ffffdd]  border p-2 m-2">
            <div className="flex items-center">
              <div className="border p-1 bg-white">
                <img src={images.avatar} alt="avatar" className="w-[60px] h-[60px]" />
              </div>
              <div className="ps-2">
                <h3 className="font-bold text-start text-sm">{issue.subject}</h3>
                <p className="text-xs ">
                  Added by
                  <Link to="#" className="text-header font-bold text-[#1c63d5] hover:text-red-500 hover:underline">
                    {" "}
                    {issue.author?.name}
                  </Link>
                  <Link to="#" className="text-header font-bold text-[#1c63d5] hover:text-red-500 hover:underline">
                    {" "}
                    {createdTimeAgo}{" "}
                  </Link>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2 text-xs m-1">
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Status:</strong>
                <span className="w-1/2 text-left">{issue.status?.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Start date:</strong>
                <span className="w-1/2 text-left">{moment(issue?.start_date).format("MM/DD/YYYY")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Priority:</strong>
                <span className="w-1/2 text-left">{issue.priority?.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Due date:</strong>
                <span className="w-1/2 text-left">{moment(issue?.due_date).format("MM/DD/YYYY")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Assignee:</strong>
                <div className="flex w-1/2">
                  {issue?.assigned_to ? (
                    <>
                      <div>
                        <div className="border p-[1px] bg-white">
                          <img src={images.avatar} alt="avatar" className="object-cover" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Link to="#" className="text-[#1c63d5] cursor-pointer text-sm hover:underline hover:text-red-500">
                          {issue.assigned_to?.name}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">% Done:</strong>
                <div className="flex w-1/2">
                  <div className="relative w-[60%] h-4 bg-gray-200">
                    <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: `${issue.done_ratio}%` }}></div>
                  </div>
                  <span className="ml-1 translate-y-[-2px]">{issue.done_ratio}%</span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Category:</strong>
                <span className="w-1/2 text-left">-</span>
              </div>

              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Estimated time:</strong>
                <span className="w-1/2 text-left">{issue?.estimated_hours} hours</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Target version:</strong>
                <span className="w-1/2 text-left">
                  <Link to="#add" className="text-[#1c63d5] cursor-pointer text-sm hover:underline hover:text-red-500 ">
                    {issue?.fixed_version?.name}
                  </Link>
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Spent time:</strong>
                <span className="w-1/2 text-left">-</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Bug Type:</strong>
                <span className="w-1/2 text-left">{getFieldValue(issue.custom_fields, "Bug Type")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Cause Category:</strong>
                <span className="w-1/2 text-left">{getFieldValue(issue.custom_fields, "Cause Category")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Severity:</strong>
                <span className="w-1/2 text-left">{getFieldValue(issue.custom_fields, "Severity")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Is Degrade?:</strong>
                <span className="w-1/2 text-left">{getFieldValue(issue.custom_fields, "Is Degrade?")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">QC Activity:</strong>
                <span className="w-1/2 text-left">{getFieldValue(issue.custom_fields, "QC Activity")}</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Reopen counter:</strong>
                <span className="w-1/2 text-left">{getFieldValue(issue.custom_fields, "Reopen counter")}</span>
              </div>
            </div>
            <hr className="border-black" />
            <div className="py-2 text-start">
              <h3 className="font-bold text-xs ">Description</h3>
              <p className="text-sm py-1 text-title">
                {issue.description ? issue.description : <span className="italic">description is empty</span>}
              </p>
            </div>
            <hr className="border-black" />
            <div className="flex justify-between items-center py-2">
              <h3 className="font-bold text-xs">Subtasks</h3>
              <Link to="#add" className="text-[#1c63d5] cursor-pointer text-sm hover:underline hover:text-red-500">
                Add
              </Link>
            </div>
            <hr className="border-black" />
            <div className="flex justify-between items-center py-2">
              <h3 className="font-bold text-xs">Related issues</h3>
              <Link to="#add" className="text-[#1c63d5] cursor-pointer text-sm hover:underline hover:text-red-500">
                Add
              </Link>
            </div>
          </div>
          {/* <div className="history text-start my-1 mx-2 ">
            <h3 className="mb-1">History</h3>
            <div className="flex items-center justify-between ">
              <p className="text-xs flex items-center space-x-2">
                <img src={images.avatar} alt="avatar" className="w-8 h-8 object-contain border p-[1px] bg-white" />
                <span>Updated by</span>
                <Link to="#" className="text-header font-bold text-[#1c63d5] hover:text-red-500 hover:underline">
                  Nguyen Dung Dep Trai (Senior)
                </Link>
                <span>7 days</span>
                <Link to="#" className="text-header font-bold text-[#1c63d5] hover:text-red-500 hover:underline">
                  ago
                </Link>
              </p>

              <Link to={"#"} className="text-end text-xs font-bold text-[#1c63d5] hover:text-red-500 hover:underline">#1</Link>
            </div>
            <ul className="text-xs flex items-center list-disc ps-10 mt-2">
              <li >
                <strong> Due Date</strong> changed from <i>07/26/2024</i> to <i>07/23/2024</i>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="bg-[#eeeeee] flex justify-end items-center gap-2 p-2">
          <button className="bg-white p-2 border-2 rounded  text-[#8db0d8] font-bold text-xs hover:border-[#8db0d8]">details</button>
          <button className="bg-white p-2 border-2 rounded text-[#8db0d8] font-bold text-xs hover:border-[#8db0d8]">edits</button>
          <button onClick={() => modal(issue)} className="bg-white p-2 border-2 rounded text-[#8db0d8] font-bold text-xs hover:border-[#8db0d8]">
            close
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default ModalDetail;
