import React from "react";

const Footer = () => {
  return (
    <div className="text-xs text-center bg-[#eeeeee] p-1 min-h-[100px]">
      Powered by
      <a className="text-primary" href="https://bitnami.com/stack/redmine">
        Bitnami Redmine Stack
      </a>
      © 2006-2015 Jean-Philippe Lang
    </div>
  );
};

export default Footer;
