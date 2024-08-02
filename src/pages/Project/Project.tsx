import React, { useState, useEffect } from "react";
import { getProjects } from "~/services/ProjectService";
import images from "~/assets/img";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  name: string;
  description: string;
  identifier: string;
}

const Project = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

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

  const handleNavigate = (identifier: string, name: string) => {
    navigate(`/projects/${identifier}/overview`, { state: { projectName: name } });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-xl font-semibold text-[#555]">Projects</h2>
        <div className="text-11">
          <a className="text-primary hover:underline hover:text-[#b2290f]" href="/issues">
            View all issues
          </a>{" "}
          |{" "}
          <a className="text-primary hover:underline hover:text-[#b2290f]" href="/time_entries">
            Overall spent time
          </a>{" "}
          |{" "}
          <a className="text-primary hover:underline hover:text-[#b2290f]" href="/activity">
            Overall activity
          </a>
        </div>
      </div>
      {projects?.map((project) => (
        <div key={project.id} className="mb-3">
          <button
            onClick={() => handleNavigate(project.identifier, project.name)}
            className="text-[#169] font-semibold hover:underline hover:text-[#b2290f]"
          >
            {project.name}
          </button>
          <div className="text-xs">{project.description}</div>
        </div>
      ))}
      <div className="flex items-center justify-end text-xs my-3">
        <img src={images.fav} alt="fav" />
        <span>My projects</span>
      </div>
      <div className="flex items-center justify-end gap-1 text-11">
        <span>Also available in:</span>
        <a className="flex items-center gap-0.5 text-[#169] hover:underline hover:text-[#b2290f]" href="">
          <img src={images.feedproject} alt="" />
          <span>Atom</span>
        </a>
      </div>
    </div>
  );
};

export default Project;
