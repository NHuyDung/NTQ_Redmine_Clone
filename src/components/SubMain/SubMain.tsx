import React from "react";
import { useLocation, useParams } from "react-router-dom";

import SubProject from "./SubProject/SubProject";
import SubOverview from "./components/SubOverview";
import SubActivity from "./components/SubActivity";

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
      default:
        return <div>Unknown section</div>;
    }
  };

  return <div className="w-1/4 pl-3">{renderContent()}</div>;
};

export default SubMain;
