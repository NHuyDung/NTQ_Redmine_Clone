import React from "react";

const HomePage = () => {
  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold">Home</h2>
      <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[120px] min-w-[820px]">
        <div className="p-3">
          <div className="flex">
            <img className="pr-1" src="https://redmine.ntq.solutions/images/projects.png"></img>
            <h3 className="bg-image font-medium">Latest projects</h3>
          </div>
          <ul className="pl-10 pt-3 list-disc">
            <li className="text-sm">
              <a className="text-primary pr-1" href="/projects/overview" rel="noreferrer noopener">
                Project name
              </a>
              Project detail
            </li>
            <li className="text-sm">
              <a className="text-primary pr-1" href="/projects/overview" rel="noreferrer noopener">
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
