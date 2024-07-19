import React from "react";
import ForgotPasswordPage from "~/pages/ForgotPasswordPage/ForgotPasswordPage";
import Help from "~/pages/Help/Help";
import HomePage from "~/pages/HomePage/HomePage";
import IssuesPage from "~/pages/IssuesPage/IssuesPage";
import LoginPage from "~/pages/LoginPage/LoginPage";
import MyAccount from "~/pages/MyAccount/MyAccount";
import LogTime from "~/pages/MyPage/LogTime";
import MyPage from "~/pages/MyPage/MyPage";
import MyPageLayoutPage from "~/pages/MyPageLayoutPage/MyPageLayoutPage";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";
import Project from "~/pages/Project/Project";
import ProjectDetail from "~/pages/ProjectDetail/ProjectDetail";
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
    path: "/my/page_layout",
    element: <MyPageLayoutPage />,
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
    path: "/projects/:projectSlug",
    element: <ProjectDetail />,
  },
  {
    path: "/issues",
    element: <IssuesPage />,
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
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/log-time",
    element: <LogTime />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routesConfig;
