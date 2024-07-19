import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="mx-3 min-w-max w-[calc(100%-24px)]">
      <Header />
      <main className="p-2 mt-2 border-1 border-solid border-primary-border bg-white min-h-max">{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
