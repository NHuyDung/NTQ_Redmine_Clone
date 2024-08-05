import React from "react";
import { useLocation, useParams } from "react-router-dom";

import SubProject from "./SubProject/SubProject";
import SubOverview from "./components/SubOverview";
import SubActivity from "./components/SubActivity";
import SubRoadmap from "./components/SubRoadmap";
import SubIssues from "./components/SubIssues";
import SubDocuments from "./components/SubDocuments";
import SubWiki from "./components/SubWiki";

const SubMain = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  const renderContent = () => {
    if (location.pathname === "/projects") {
      return <SubProject />;
    }

    // check slug
    switch (slug) {
      case "overview":
        return <SubOverview />;
      case "activity":
        return <SubActivity />;
      case "roadmap":
        return <SubRoadmap />;
      case "issues":
        return <SubIssues />;
      case "documents":
        return <SubDocuments />;
      case "gantt":
        return <SubIssues />;
      case "calendar":
        return <SubIssues />;
      case "wiki":
        return <SubWiki />;
      default:
        return <div>Unknown section</div>;
    }
  };

  return <div className="w-1/4 pl-3">{renderContent()}</div>;
};

export default SubMain;
