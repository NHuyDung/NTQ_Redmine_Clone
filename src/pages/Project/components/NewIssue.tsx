import React from "react";
import images from "~/assets/img";

interface Item {
  label: string;
  value: string;
}

interface ButtonData {
  id: number;
  backgroundImage: string;
}

const items1: Item[] = [
  { label: "Status", value: "1" },
  { label: "Priority", value: "2" },
  { label: "Assignee", value: "3" },
  { label: "Target version", value: "4" },
];

const items2: Item[] = [
  { label: "Parent task", value: "1" },
  { label: "Start date", value: "2" },
  { label: "Due date", value: "3" },
  { label: "Estimate time", value: "4" },
  { label: "% Done", value: "5" },
];

const items3: Item[] = [
  { label: "Bug Type", value: "1" },
  { label: "Severity", value: "2" },
  { label: "QC Activity", value: "3" },
];

const items4: Item[] = [
  { label: "Cause Category", value: "1" },
  { label: "Is Degrade?", value: "2" },
  { label: "Reopen counter", value: "3" },
];

const items5: Item[] = [
  { label: "A", value: "1" },
  { label: "B", value: "2" },
  { label: "C", value: "3" },
];

//   const option1: Item[] = [
//     { label: "New", value: "1" },
//     { label: "In Progress", value: "2" },
//     { label: "Reviewing", value: "3" },
//     { label: "Feedback", value: "4" },
//     { label: "Resolved", value: "5" },
//     { label: "Build", value: "6" },
//     { label: "Closed", value: "7" },
//     { label: "Can't fix", value: "8" },
//     { label: "Next Release", value: "9" },
//     { label: "Watching", value: "10" },
//     { label: "Release OK", value: "11" },
//     { label: "Done STG", value: "12" },
//     { label: "Release Honban (Done Honban)", value: "13" },
//   ];

const buttonData: ButtonData[] = [
  { id: 1, backgroundImage: images.newissue_strong },
  { id: 2, backgroundImage: images.newissue_italic },
  { id: 3, backgroundImage: images.newissue_underline },
  { id: 4, backgroundImage: images.newissue_delete },
  { id: 5, backgroundImage: images.newissue_inlinecode },
  { id: 6, backgroundImage: images.newissue_heading1 },
  { id: 7, backgroundImage: images.newissue_heading2 },
  { id: 8, backgroundImage: images.newissue_heading3 },
  { id: 9, backgroundImage: images.newissue_ul },
  { id: 10, backgroundImage: images.newissue_ol },
  { id: 11, backgroundImage: images.newissue_bq },
  { id: 12, backgroundImage: images.newissue_bq_remove },
  { id: 13, backgroundImage: images.newissue_pre },
  { id: 14, backgroundImage: images.newissue_link },
  { id: 15, backgroundImage: images.newissue_img },
  { id: 16, backgroundImage: images.newissue_help },
];

const NewIssue = () => {
  return (
    <div>
      <h2 className="text-[#555] text-lg text-5 font-semibold mb-2 flex items-center justify-between">New issue</h2>
      <div className="bg-gray-50 text-gray-700 leading-6 border border-gray-200 break-words min-h-[715px] pl-[140px] pr-[90px]">
        <p className="mb-2">
          <label className="text-[#555] text-xs font-semibold mb-2">Tracker</label>
          <span className="text-[#bb0000]">*</span>
          <select className="border border-primary-border w-56 h-6">
            <option>Bug</option>
            <option>Task</option>
          </select>
        </p>
        <p className="mb-2">
          <label className="text-[#555] text-xs font-semibold mb-2 mr-2">Subject</label>
          <input type="text" className="border border-primary-border w-full h-6"></input>
        </p>
        <p className="mb-2">
          <span>
            <div className="flex flex-wrap gap-2.5">
              <label className="text-[#555] text-xs font-semibold mb-2 mr-2">Description</label>
              {buttonData.map((button) => (
                <button
                  key={button.id}
                  style={{ backgroundImage: `url(${button.backgroundImage})` }}
                  className="w-4 h-4 bg-cover bg-center border-none cursor-pointer mr-1 p-1 border border-gray-300 bg-gray-200 bg-no-repeat"
                ></button>
              ))}
            </div>
            <div>
              <textarea className="border border-primary-border w-full h-[170px]"></textarea>
            </div>
          </span>
        </p>

        <div>
          <div>
            <div className="flex justify-between mr-[180px]">
              <p className="w-1/3">
                {items1.map((item, index) => (
                  <div key={index} className="mb-2 flex">
                    <label className="text-[#555] text-xs font-semibold mb-2 mr-2">{item.label}</label>
                    <select className="border border-primary-border w-full h-6">
                      <option></option>
                    </select>
                  </div>
                ))}
              </p>
              <p className="w-1/3">
                {items2.map((item, index) => (
                  <div key={index} className="mb-2 flex">
                    <label className="text-[#555] text-xs font-semibold mb-2 mr-2">{item.label}</label>
                    <select className="border border-primary-border w-full h-6">
                      <option></option>
                    </select>
                  </div>
                ))}
              </p>
            </div>
            <div className="flex justify-between mr-[180px]">
              <p className="w-1/3">
                {items3.map((item, index) => (
                  <div key={index} className="mb-2 flex">
                    <label className="text-[#555] text-xs font-semibold mb-2 mr-2">{item.label}</label>
                    <select className="border border-primary-border w-full h-6">
                      <option></option>
                    </select>
                  </div>
                ))}
              </p>
              <p className="w-1/3">
                {items4.map((item, index) => (
                  <div key={index} className="mb-3 flex">
                    <label className="text-[#555] text-xs font-semibold mb-2 mr-2">{item.label}</label>
                    <select className="border border-primary-border w-full h-6">
                      <option></option>
                    </select>
                  </div>
                ))}
              </p>
            </div>
          </div>
          <div>
            <div>
              <label className="text-[#555] text-xs font-semibold mb-2 mr-2">Files</label>
              <span className="text-xs">
                <input type="file"></input>
                (Maximum size: 500 MB)
              </span>
            </div>
            <div>
              <label className="text-[#555] text-xs font-semibold mb-2 mr-2">Watchers</label>
              <span>
                {items5.map((item, index) => (
                  <div key={index}>
                    <input type="checkbox"></input>
                    <label>{item.label}</label>
                  </div>
                ))}
              </span>
            </div>
            <a className="flex items-center">
              <img src={images.add} className="w-4 h-3 pr-1"></img>
              <p className="text-primary hover:underline hover:text-[#b2290f] text-[0.6rem]">Search for watchers to add</p>
            </a>
          </div>
        </div>
      </div>
      <button className="border border-[#cccccc] border-[1px] text-[#222222] bg-[#f2f2f2] text-13 mt-2.5 mr-1 w-12 hover:bg-[#c3c2c2]">Create</button>
      <button className="border border-[#cccccc] border-[1px] text-[#222222] bg-[#f2f2f2] text-13 mt-2.5 mr-1 w-30 hover:bg-[#c3c2c2]">
        Create and continue
      </button>
      <a className="text-primary hover:underline hover:text-[#b2290f] text-xs">Preview</a>
    </div>
  );
};

export default NewIssue;
