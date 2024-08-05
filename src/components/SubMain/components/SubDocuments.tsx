import React from "react";

const SubDocuments = () => {
  return (
    <div>
      <h3 className="text-sm text-[#666] font-medium mt-3.5 mb-2.5">Sort by</h3>
      <ul className="text-xs">
        <li>
          <a className="text-[#169] hover:underline hover:text-[#c61a1a]" href="/projects/fresher-_-reactjs-fresher/issues?set_filter=1">
            Category
          </a>
        </li>
        <li>
          <a className="text-[#169] hover:underline hover:text-[#c61a1a]" href="/projects/fresher-_-reactjs-fresher/issues/report">
            Date
          </a>
        </li>

        <li>
          <a className="text-[#169] hover:underline hover:text-[#c61a1a]" href="/projects/fresher-_-reactjs-fresher/issues/calendar">
            Title
          </a>
        </li>
        <li>
          <a className="text-[#169] hover:underline hover:text-[#c61a1a]" href="/projects/fresher-_-reactjs-fresher/issues/gantt">
            Author
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SubDocuments;
