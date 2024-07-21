import React from "react";
import DragAndDrop from "~/components/DragAndDrop/DragAndDrop";

const MyPageLayoutPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-[#555] text-lg text-5 font-semibold">My page</h2>
        <div className="flex align-middle">
          <p>My page block</p>
          <select>
            <option></option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <a className="flex align-middle">
            <img src="https://redmine.ntq.solutions/images/add.png" className="w-4 h-4"></img> Add
          </a>

          <a href="/my-page" rel="noreferrer noopener" className="flex">
            <img src="https://redmine.ntq.solutions/images/cancel.png" className="w-4 h-4"></img> Back
          </a>
        </div>
      </div>
      <DragAndDrop hasBorder={true} />
    </div>
  );
};

export default MyPageLayoutPage;
