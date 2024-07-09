import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Header />
      <main className="max-w-7xl">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
