import React from "react";

const MyPageLayoutPage = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-[#555] text-lg text-5 font-semibold">My page</h2>

        <div>
          <p>My page block</p>
          <select>
            <option></option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>

          <a>
            <img src="https://redmine.ntq.solutions/images/add.png"></img> Add
          </a>

          <a href="/my-page" rel="noreferrer noopener">
            <img src="https://redmine.ntq.solutions/images/cancel.png"></img> Back
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyPageLayoutPage;
