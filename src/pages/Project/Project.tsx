import React, { useState, useEffect } from "react";
import axiosInstance from "~/services/api"; // Sử dụng axiosInstance

interface Project {
  id: number;
  name: string;
  description: string;
}

interface ProjectsResponse {
  projects: Project[];
}

const Project = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get<ProjectsResponse>("/projects.json"); // Sử dụng axiosInstance
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <div className="mb-2.5">
        <h2 className="text-xl font-semibold text-[#555]">Projects</h2>
      </div>
      {projects?.map((project) => (
        <div key={project.id} className="mb-3">
          <a href="/projects/overview" rel="noreferrer noopener" className="text-[#169] font-semibold hover:underline hover:text-[#b2290f]">
            {project.name}
          </a>
          <div className="text-xs">{project.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Project;
