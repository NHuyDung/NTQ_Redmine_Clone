import React, { useEffect, useState } from "react";
import { getMembers } from "~/services/ProjectService";

interface Member {
  id: number;
  name: string;
  roles: { name: string }[];
  user: { name: string };
}
const ProjectOverviewPage = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getMembers();
        setMembers(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);
  console.log(members);

  const managers = members.filter((member) => {
    return member.roles.some((role) => role.name === "Manager");
  });
  console.log(managers);

  const developers = members.filter((member) => {
    return member.roles.some((role) => role.name === "Developer");
  });

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
              <li className="">
                <a className=" text-primary cursor-pointer pr-1.5  hover:underline hover:text-[#b2290f]" rel="noreferrer noopener">
                  Bug
                </a>
                4 open / 4
              </li>
              <li className="">
                <a className=" text-primary cursor-pointer pr-1  hover:underline hover:text-[#b2290f]" rel="noreferrer noopener">
                  Task
                </a>
                3 open / 3
              </li>
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

export default ProjectOverviewPage;
