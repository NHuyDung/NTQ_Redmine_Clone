import React, { useEffect, useState } from "react";
import { getMembers, getTrackerQuantity } from "~/services/ProjectService";

interface Member {
  id: number;
  name: string;
  roles: { name: string }[];
  user: { name: string };
}

interface TrackerItem {
  id: number;
  tracker: {
    id: number;
    name: string;
  };
}

interface OverviewProps {
  identifier: string;
}

const Overview: React.FC<OverviewProps> = ({ identifier }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [trackerQuantity, setTrackerQuantity] = useState<TrackerItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersResult, trackerResult] = await Promise.all([getMembers(identifier), getTrackerQuantity(identifier)]);
        setMembers(membersResult);
        setTrackerQuantity(trackerResult);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [identifier]);

  const managers = members.filter((member) => {
    return member.roles.some((role) => role.name === "Manager");
  });

  const developers = members.filter((member) => {
    return member.roles.some((role) => role.name === "Developer");
  });

  const trackerCount = trackerQuantity.reduce<Record<string, number>>((acc, issue) => {
    const trackerName = issue.tracker.name;
    if (acc[trackerName]) {
      acc[trackerName]++;
    } else {
      acc[trackerName] = 1;
    }
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-[#555] text-lg text-5 font-semibold">Overview</h2>
      <div className="flex justify-between items-center">
        <div className="mr-2 border border-gray-300 border-solid w-1/2">
          <div className="p-2.5">
            <div className="flex">
              <img className="pr-[6px]" src="https://redmine.ntq.solutions/images/ticket.png"></img>
              <h3 className="bg-image font-medium">Issue tracking</h3>
            </div>
            <ul className="text-xs pl-10 pt-2.5 list-disc">
              {Object.entries(trackerCount).map(([trackerName, count]) => (
                <li key={trackerName} className="">
                  <a className="text-primary cursor-pointer pr-1.5 hover:underline hover:text-[#b2290f]" rel="noreferrer noopener">
                    {trackerName}
                  </a>
                  {` ${count} open / ${count}`}
                </li>
              ))}
            </ul>
            <div className="text-xs flex pt-2.5">
              <a href="/issues" className=" pl-1  text-primary cursor-pointer  hover:underline hover:text-[#b2290f]" rel="noreferrer noopener">
                View all issues |
              </a>
              <a className=" pl-1  text-primary cursor-pointer  hover:underline hover:text-[#b2290f]" rel="noreferrer noopener">
                Calendar |
              </a>
              <a className=" pl-1  text-primary cursor-pointer  hover:underline hover:text-[#b2290f]" rel="noreferrer noopener">
                Gantt
              </a>
            </div>
          </div>
        </div>

        <div className="mr-2 border border-gray-300 border-solid w-1/2">
          <div className="p-[10px]">
            <div className="flex pb-3">
              <img className="pr-[6px]" src="https://redmine.ntq.solutions/images/group.png" alt="redmine_ntq_solutions"></img>
              <h3 className="bg-image font-medium">Members</h3>
            </div>
            <div className="text-xs">
              <p className="break-words w-auto">
                Manager:
                {managers.map((manager) => (
                  <a className="text-primary cursor-pointer  hover:underline hover:text-[#b2290f]" key={manager.id} rel="noreferrer noopener">
                    {manager.user.name},{" "}
                  </a>
                ))}
              </p>
              <p className="break-words max-w-[550px]">
                Developer:
                {developers.map((developer) => (
                  <a className="text-primary cursor-pointer  hover:underline hover:text-[#b2290f]" key={developer.id} rel="noreferrer noopener">
                    {developer.user.name},{" "}
                  </a>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
