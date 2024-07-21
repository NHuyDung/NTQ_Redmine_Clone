import React from "react";
import DragAndDrop from "~/components/DragAndDrop/DragAndDrop";

const MyPageLayoutPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-[#555] text-lg text-5 font-semibold">My page</h2>
        <div className="flex items-center">
          <p className="pr-2 text-xs">My page block</p>
          <select className="border border-primary-border w-32 h-6 text-xs mx-2">
            <option></option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <a className="flex items-center mx-2">
            <img src="https://redmine.ntq.solutions/images/add.png" className="w-4 h-4"></img>
            <p className="text-xs hover:underline hover:text-red-400">Add</p>
          </a>

          <a href="/my-page" rel="noreferrer noopener" className="flex items-center mx-2">
            <img src="https://redmine.ntq.solutions/images/cancel.png" className="w-4 h-4"></img>
            <p className="text-xs hover:underline hover:text-red-400">Back</p>
          </a>
        </div>
      </div>
      <DragAndDrop hasBorder={true} />
    </div>
  );
};

export default MyPageLayoutPage;
