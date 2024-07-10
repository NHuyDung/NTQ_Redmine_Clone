import React, { ReactNode } from "react";
import Header from "../Header";
import Footer from "../Footer";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#eeeeee]">
      <div className="relative mx-[10px]">
        <Header />
        <main className="p-2 mt-[6px] border-[1px] border-solid border-[#bbb] bg-white">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
