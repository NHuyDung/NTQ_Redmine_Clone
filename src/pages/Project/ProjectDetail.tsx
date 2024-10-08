import React from "react";
import { useParams } from "react-router-dom";
import Overview from "./components/Overview";
import Activity from "./components/Activity";
import Roadmap from "./components/Roadmap";
import NewIssue from "./components/NewIssue";
import Issues from "./components/Issues";
import Documents from "./components/Documents";
import Files from "./components/Files";
import Settings from "./components/Settings";
import Wiki from "./components/Wiki";
import Gantt from "./components/Gantt";
import Calendar from "./components/Canlendar";

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
        return <Roadmap identifier={identifier} />;
      case "newissue":
        return <NewIssue />;
      case "issues":
        return <Issues />;
      case "gantt":
        return <Gantt />;
      case "calendar":
        return <Calendar />;
      case "documents":
        return <Documents />;
      case "wiki":
        return <Wiki />;
      case "files":
        return <Files />;
      case "settings":
        return <Settings identifier={identifier} />;
      default:
        return <div>Unknown section</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default ProjectDetail;
