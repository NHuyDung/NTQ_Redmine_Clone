import React from "react";
import { useParams } from "react-router-dom";
import Overview from "./components/Overview";
import Activity from "./components/Activity";

const ProjectDetail = () => {
  const { identifier, slug } = useParams<{ identifier: string; slug: string }>();

  if (!identifier) return <div>Project not found</div>;

  const renderContent = () => {
    switch (slug) {
      case "overview":
        return <Overview identifier={identifier} />;
      case "activity":
        return <Activity />;
      default:
        return <div>Unknown section</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default ProjectDetail;
