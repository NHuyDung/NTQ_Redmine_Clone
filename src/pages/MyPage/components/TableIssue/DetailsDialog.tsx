import React from "react";
import Draggable from "react-draggable";
import "./DetailsDialog.css";
import images from "~/assets/img";
interface IDragProps {
  toggleDialogVisibility: () => void;
}

const DetailsDialog: React.FC<IDragProps> = ({ toggleDialogVisibility }) => {
  return (
    <Draggable>
      <div className="bg-white fixed top-0 right-0 bottom-0 left-0 w-[600px] h-[600px]">
        <div className="">
          <div className="flex justify-between items-center bg-header m-1 bg-[#8db0d8]">
            <h2 style={{ marginRight: "auto" }} className="text-xs p-2 text-white font-bold">
              Quick View - #122712 Test Api Reported issues
            </h2>
            <button onClick={toggleDialogVisibility} className="icon bg-[#fff] w-5 h-5 rounded-sm me-1"></button>
            {/* <FaWindowClose onClick={toggleDialogVisibility} style={{ marginLeft: "auto" }} className="pr-2 text-white text-xl cursor-pointer" /> */}
          </div>
          <div className="bg-[#ffffdd] my-1 mx-2 border p-2 mt-1 mb-3">
            <div className="flex items-center">
              <div className="border p-1 bg-white">
                <img src={images.avatar} alt="avatar" className="w-[60px] h-[60px]" />
              </div>
              <div className="ps-2">
                <h3 className="font-bold text-start text-sm">Clone Redmine 2</h3>
                <p className="text-xs ">
                  Added by
                  <a href="#" className="text-header font-bold text-[#1c63d5] hover:text-red-500 hover:underline">
                    {" "}
                    Nguyen Dung Dep Trai (Senior)
                  </a>
                  <a href="#" className="text-header font-bold text-[#1c63d5] hover:text-red-500 hover:underline">
                    {" "}
                    7 days{" "}
                  </a>
                  ago
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-2 text-xs m-1">
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Status:</strong>
                <span className="w-1/2 text-left">New</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Start date:</strong>
                <span className="w-1/2 text-left">07/08/2024</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Priority:</strong>
                <span className="w-1/2 text-left">Normal</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Due date:</strong>
                <span className="w-1/2 text-left">07/13/2024</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Assignee:</strong>
                <div className="flex w-1/2">
                  <div>
                    <div className="border p-[1px] bg-white">
                      <img src={images.avatar} alt="avatar" className="w-5 h-5 object-contain" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <a href="#" className="text-header">
                      Son(InternShip)
                    </a>
                    <a href="#" className="text-header">
                      Nguyen Hoang Huu
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">% Done:</strong>
                <div className="flex w-1/2">
                  <div className="relative w-[60%] h-4 bg-gray-200">
                    <div className="absolute top-0 left-0 h-full bg-green-500 w-[10%]"></div>
                  </div>
                  <span className="ml-1 translate-y-[-2px]">10%</span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Category:</strong>
                <span className="w-1/2 text-left">-</span>
              </div>

              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Estimated time:</strong>
                <span className="w-1/2 text-left">12.00 hours</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Target version:</strong>
                <span className="w-1/2 text-left">-</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Spent time:</strong>
                <span className="w-1/2 text-left">-</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Bug Type:</strong>
                <span className="w-1/2 text-left">Others</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Cause Category:</strong>
                <span className="w-1/2 text-left">9. Other</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Severity:</strong>
                <span className="w-1/2 text-left">Cosmetic</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Is Degrade?:</strong>
                <span className="w-1/2 text-left">No</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">QC Activity:</strong>
                <span className="w-1/2 text-left">Other Test</span>
              </div>
              <div className="flex justify-between mt-2">
                <strong className="w-1/2 text-left">Reopen counter:</strong>
                <span className="w-1/2 text-left">0</span>
              </div>
            </div>
            <hr className="border-black" />
            <div className="py-2 text-start">
              <h3 className="font-bold text-xs ">Description</h3>
              <p className="text-sm py-1 text-title ">Task 2</p>
              {/* <p className="text-sm py-1 text-title ">description is empty</p> */}
            </div>
            <hr className="border-black" />
            <div className="flex justify-between items-center py-2">
              <h3 className="font-bold text-xs">Subtasks</h3>
              <a href="#add" className="text-[#1c63d5] cursor-pointer text-sm hover:underline hover:text-red-500">
                Add
              </a>
            </div>
            <hr className="border-black" />
            <div className="flex justify-between items-center py-2">
              <h3 className="font-bold text-xs">Related issues</h3>
              <a href="#add" className="text-[#1c63d5] cursor-pointer text-sm hover:underline hover:text-red-500">
                Add
              </a>
            </div>
          </div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
          <div>&nbsp;</div>
        </div>
        <div className="bg-[#eeeeee] flex justify-end items-center gap-2 p-2">
          <button className="bg-white p-2 border rounded  text-[#8db0d8] font-bold text-xs hover:border-[#8db0d8]">details</button>
          <button className="bg-white p-2 border rounded text-[#8db0d8] font-bold text-xs hover:border-[#8db0d8]">edits</button>
          <button onClick={toggleDialogVisibility} className="bg-white p-2 border rounded text-[#8db0d8] font-bold text-xs hover:border-[#8db0d8]">
            close
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default DetailsDialog;
