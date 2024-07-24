import React, { useState, useEffect } from "react";
import { getProjects } from "~/services/ProjectService";

interface Project {
  id: number;
  name: string;
  description: string;
  created_on: string;
}

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects();
        setProjects(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleViewProject = (projectId: number) => {
    localStorage.setItem("project-id", String(projectId));
  };

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
            {projects.map((project) => (
              <li className="text-[14px]" key={project.id}>
                <a onClick={() => handleViewProject(project.id)} className="text-primary pr-1" href="/projects/overview" rel="noreferrer noopener">
                  {project.name}
                </a>
                ({project.created_on})<br></br>
                {project.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
