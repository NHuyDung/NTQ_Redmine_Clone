import React from "react";

const SubActivity = () => {
  return (
    <form acceptCharset="UTF-8" action="/projects/fresher-_-reactjs-fresher/activity" method="get">
      <div style={{ margin: 0, padding: 0, display: "inline" }}>
        <input name="utf8" type="hidden" value="✓" />
      </div>
      <h3 className="text-[#666] text-sm mt-3.5 mb-2.5">Activity</h3>
      <ul className="text-xs ">
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer  hover:underline hover:text-[#b2290f]">
          <input defaultChecked={true} id="show_issues" name="show_issues" type="checkbox" value="1" />
          <label htmlFor="show_issues">
            <a href="/projects/fresher-_-reactjs-fresher/activity?show_issues=1">Issues</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer  hover:underline hover:text-[#b2290f]">
          <input defaultChecked={true} id="show_changesets" name="show_changesets" type="checkbox" value="1" />
          <label htmlFor="show_changesets">
            <a href="/projects/fresher-_-reactjs-fresher/activity?show_changesets=1">Changesets</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer  hover:underline hover:text-[#b2290f]">
          <input defaultChecked={true} id="show_documents" name="show_documents" type="checkbox" value="1" />
          <label htmlFor="show_documents">
            <a href="/projects/fresher-_-reactjs-fresher/activity?show_documents=1">Documents</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer  hover:underline hover:text-[#b2290f]">
          <input defaultChecked={true} id="show_files" name="show_files" type="checkbox" value="1" />
          <label htmlFor="show_files">
            <a href="/projects/fresher-_-reactjs-fresher/activity?show_files=1">Files</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer  hover:underline hover:text-[#b2290f]">
          <input id="show_wiki_edits" name="show_wiki_edits" type="checkbox" value="1" />
          <label htmlFor="show_wiki_edits">
            <a href="/projects/fresher-_-reactjs-fresher/activity?show_wiki_edits=1">Wiki edits</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer  hover:underline hover:text-[#b2290f]">
          <input id="show_time_entries" name="show_time_entries" type="checkbox" value="1" />
          <label htmlFor="show_time_entries">
            <a href="/projects/fresher-_-reactjs-fresher/activity?show_time_entries=1">Spent time</a>
          </label>
        </li>
      </ul>

      <input className="text-xs text-[#222222] bg-[#f2f2f2] border border-[#cccccc] py-0.5 px-1.5 my-3" type="submit" value="Apply" />
    </form>
  );
};

export default SubActivity;
