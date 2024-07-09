import React from "react";
import HomePage from "~/pages/HomePage/HomePage";
import LoginPage from "~/pages/LoginPage/LoginPage";
import MyPage from "~/pages/MyPage/MyPage";
import NotFoundPage from "~/pages/NotFoundPage/NotFoundPage";

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
    path: "/mypage",
    element: <MyPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routesConfig;
