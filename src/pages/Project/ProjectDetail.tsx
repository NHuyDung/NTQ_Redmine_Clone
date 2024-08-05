import React from "react";
import { useParams } from "react-router-dom";
import Overview from "./components/Overview";
import Activity from "./components/Activity";
import Roadmap from "./components/Roadmap";
import NewIssue from "./components/NewIssue";

const ProjectDetail = () => {
  const { identifier, slug } = useParams<{ identifier: string; slug: string }>();

  if (!identifier) return <div>Project not found</div>;

  const renderContent = () => {
    switch (slug) {
      case "overview":
        return <Overview identifier={identifier} />;
      case "activity":
        return <Activity identifier={identifier} />;
      case "roadmap":
        return <Roadmap />;
      case "newissue":
        return <NewIssue />;
      default:
        return <div>Unknown section</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default ProjectDetail;
