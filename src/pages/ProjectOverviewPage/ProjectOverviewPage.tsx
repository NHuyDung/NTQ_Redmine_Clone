import React from "react";

const ProjectOverviewPage = () => {
  return (
    <div>
      <h2 className="text-[#555] text-lg text-5 font-semibold">Overview</h2>
      <div className="flex justify-between">
        <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[130px] min-w-[620px]">
          <div className="p-[10px]">
            <div className="flex">
              <img className="pr-[6px]" src="https://redmine.ntq.solutions/images/ticket.png"></img>
              <h3 className="bg-image font-medium">Issue tracking</h3>
            </div>
            <ul className="pl-[40px] pt-[10px] list-disc">
              <li className="text-[14px]">
                <a className="text-primary pr-[6px]" rel="noreferrer noopener">
                  Bug
                </a>
                4 open / 4
              </li>
              <li className="text-[14px]">
                <a className="text-primary pr-1" rel="noreferrer noopener">
                  Task
                </a>
                3 open / 3
              </li>
            </ul>
            <div className="flex pt-[10px]">
              <a className="text-sm pl-1 text-primary" rel="noreferrer noopener">
                View all issues |
              </a>
              <a className="text-sm pl-1 text-primary" rel="noreferrer noopener">
                Calendar |
              </a>
              <a className="text-sm pl-1 text-primary" rel="noreferrer noopener">
                Gantt
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[145px] min-w-[620px]">
          <div className="p-[10px]">
            <div className="flex pb-3">
              <img className="pr-[6px]" src="https://redmine.ntq.solutions/images/group.png"></img>
              <h3 className="bg-image font-medium">Members</h3>
            </div>
            <div>
              <p className="text-[14px] break-words max-w-48">Manager:</p>
              <p className="text-[14px] break-words max-w-48">Developer:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewPage;
