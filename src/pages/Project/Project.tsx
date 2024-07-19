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
      <h2>Project List</h2>
      <ul>{projects?.map((project) => <li key={project.id}>{project.name}</li>)}</ul>
    </div>
  );
};

export default Project;
