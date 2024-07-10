import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="relative max-w-7xl mx-auto ">
      <Header />
      <main className="p-2">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
