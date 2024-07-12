import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  const projects = [
    { id: 1, name: "Overview", slug: "overview" },
    { id: 2, name: "Activity", slug: "activity" },
    { id: 3, name: "Issues", slug: "issues" },
    { id: 4, name: "New issue", slug: "newissue" },
    { id: 5, name: "Gantt", slug: "gantt" },
    { id: 6, name: "Calendar", slug: "calendar" },
    { id: 7, name: "Documents", slug: "documents" },
    { id: 8, name: "Wiki", slug: "wiki" },
    { id: 9, name: "Files", slug: "files" },
    { id: 10, name: "Settings", slug: "settings" },
  ];

  console.log();

  const selectedProject = projects.find((project) => project.slug === projectSlug);

  if (!selectedProject) return <div>{projects[0].name}</div>;

  return (
    <div>
      <h2>{selectedProject.name}</h2>
      <p>Project Slug: {projectSlug}</p>
    </div>
  );
};

export default ProjectDetail;
