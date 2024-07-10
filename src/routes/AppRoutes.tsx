import React from "react";
import { Routes, Route } from "react-router-dom";
import routesConfig from "./routesConfig";
import DefaultLayout from "~/components/DefaultLayout/DefaultLayout";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routesConfig.map((route, index) => {
        const Page = route.element;
        return <Route key={index} path={route.path} element={<DefaultLayout>{Page}</DefaultLayout>} />;
      })}
    </Routes>
  );
};

export default AppRoutes;
