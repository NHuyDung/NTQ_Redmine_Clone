import React from "react";
import { useParams } from "react-router-dom";
import { Projects } from "~/const/Project";

const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  const selectedProject = Projects.find((project) => project.slug === projectSlug);

  if (!selectedProject) return <div>{Projects[0].name}</div>;
  return (
    <div>
      <h2>{selectedProject.name}</h2>
      <p>Project Slug: {projectSlug}</p>
    </div>
  );
};

export default ProjectDetail;
