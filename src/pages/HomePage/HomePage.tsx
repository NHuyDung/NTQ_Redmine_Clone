import React from "react";
// import {useState, useEffect} from "react";
// import { getProjects } from "~/services/ProjectService";

const HomePage = () => {
  // const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     try {
  //       const result = await getProjects();
  //       setProjects(result);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchProjects();
  // }, []);
  // console.log(projects);
  return (
    <div className="flex justify-between">
      <h2 className="text-lg text-[20px] font-semibold">Home</h2>
      <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[120px] min-w-[820px]">
        <div className="p-3">
          <div className="flex">
            <img className="pr-1" src="https://redmine.ntq.solutions/images/projects.png"></img>
            <h3 className="bg-image font-medium">Latest projects</h3>
          </div>
          <ul className="pl-10 pt-3 list-disc">
            <li className="text-[14px]">
              <a className="text-primary pr-1" href="/projects/overview" rel="noreferrer noopener">
                Project name
              </a>
              Project detail
            </li>
            <li className="text-[14px]">
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
