import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="bg-primary-sub_bg">
      <div className="mx-3">
        <Header />
        <main className="p-2 mt-2 border-1 border-solid border-primary-border bg-white min-h-615">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
