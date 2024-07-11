import React from "react";
import Help from "~/pages/Help/Help";
import HomePage from "~/pages/HomePage/HomePage";
import LoginPage from "~/pages/LoginPage/LoginPage";
import MyAccount from "~/pages/MyAccount/MyAccount";
import MyPage from "~/pages/MyPage/MyPage";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";
import Project from "~/pages/Project/Project";
import ProjectOverviewPage from "~/pages/ProjectOverviewPage/ProjectOverviewPage";
import SignOut from "~/pages/SignOut/SignOut";
import WorkTime from "~/pages/WorkTime/WorkTime";

interface RouteConfig {
  path: string;
  element: React.ReactElement;
}

const routesConfig: RouteConfig[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/my-page",
    element: <MyPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/projects",
    element: <Project />,
  },
  {
    path: "/projects/overview",
    element: <ProjectOverviewPage />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/work-time",
    element: <WorkTime />,
  },
  {
    path: "/my-account",
    element: <MyAccount />,
  },
  {
    path: "/sign-out",
    element: <SignOut />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routesConfig;
