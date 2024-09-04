import React, { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import SubMain from "../SubMain/SubMain";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;
  const excludedPaths = [
    "/projects/fresher-_-reactjs-fresher/files",
    "/projects/fresher-_-reactjs-fresher/settings",
    "/projects/fresher-_-reactjs-fresher/newissue",
    "/projects/fresher-_-reactjs-fresher/new_versions",
  ];
  const isProjectPath = path.startsWith("/projects") && !excludedPaths.includes(path);
  const projectName = location.state?.projectName;

  return (
    <div className="mx-3 min-w-max w-[calc(100%-24px)]">
      <Header title={projectName} />
      <div className="flex justify-between mt-2">
        <main className={`${isProjectPath ? "w-3/4" : "w-full"} p-2  border-1 border-solid border-primary-border bg-white h-full min-h-615`}>
          {children}
        </main>
        {isProjectPath && <SubMain />}
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
