import React from "react";

const SubWiki = () => {
  return (
    <div>
      <h3 className="text-sm text-[#666] font-medium mt-3.5 mb-2.5">Wiki</h3>
      <ul className="text-xs">
        <li>
          <a className="text-[#169] hover:underline hover:text-[#c61a1a]" href="/projects/fresher-_-reactjs-fresher/issues?set_filter=1">
            Start page
          </a>
        </li>
        <li>
          <a className="text-[#169] hover:underline hover:text-[#c61a1a]" href="/projects/fresher-_-reactjs-fresher/issues/report">
            Index by title
          </a>
        </li>

        <li>
          <a className="text-[#169] hover:underline hover:text-[#c61a1a]" href="/projects/fresher-_-reactjs-fresher/issues/calendar">
            Index by date
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SubWiki;
