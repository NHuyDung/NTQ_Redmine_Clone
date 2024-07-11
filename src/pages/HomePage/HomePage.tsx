import React from "react";

const HomePage = () => {
  return (
    <div className="flex justify-between">
      <h2 className="text-lg text-[20px] font-[600]">Home</h2>
      <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[120px] min-w-[820px]">
        <div className="p-[10px]">
          <div className="flex">
            <img className="pr-[6px]" src="https://redmine.ntq.solutions/images/projects.png"></img>
            <h3 className="bg-image font-medium">Latest projects</h3>
          </div>
          <ul className="pl-[40px] pt-[10px] list-disc">
            <li className="text-[14px]">
              <a className="text-primary pr-[6px]" href="/project">
                Project name
              </a>
              Project detail
            </li>
            <li className="text-[14px]">
              <a className="text-primary pr-[6px]" href="/project">
                Project name
              </a>
              Project detail
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
