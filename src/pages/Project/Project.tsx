import React, { useState, useEffect } from "react";
import { getProjects } from "~/services/ProjectService";

interface Project {
  id: number;
  name: string;
  description: string;
  identifier: string;
}

const Project = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);
  console.log(projects);
  return (
    <div>
      <div className="mb-2.5">
        <h2 className="text-xl font-semibold text-[#555]">Projects</h2>
      </div>
      {projects?.map((project) => (
        <div key={project.id} className="mb-3">
          <a
            href={`/projects/${project.identifier}`}
            rel="noreferrer noopener"
            className="text-[#169] font-semibold hover:underline hover:text-[#b2290f]"
          >
            {project.name}
          </a>
          <div className="text-xs">{project.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Project;
