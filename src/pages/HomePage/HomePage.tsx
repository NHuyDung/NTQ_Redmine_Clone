import React, { useState, useEffect } from "react";
import { getProjects } from "~/services/ProjectService";
import images from "~/assets/img";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  description: string;
  created_on: string;
  identifier: string;
}

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

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

  const handleNavigate = (identifier: string, name: string) => {
    navigate(`/projects/${identifier}/overview`, { state: { projectName: name } });
  };

  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold">Home</h2>
      <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[120px] min-w-[772px]">
        <div className="p-3">
          <div className="flex">
            <img className="pr-1" src={images.homepage} alt="redmine_ntq_solutions"></img>
            <h3 className=" font-medium">Latest projects</h3>
          </div>
          <ul className="pl-10 pt-3 list-disc">
            {projects.map((project) => (
              <li className="text-xs" key={project.id}>
                <button onClick={() => handleNavigate(project.identifier, project.name)} className="text-[#169] hover:underline hover:text-[#b2290f]">
                  {project.name}
                </button>
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
