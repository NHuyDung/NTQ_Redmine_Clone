import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-xs text-center p-1">
      Powered by
      <Link className="text-primary mx-1" to="https://bitnami.com/stack/redmine" rel="noreferrer noopener">
        Bitnami Redmine Stack
      </Link>
      © 2006-2015 Jean-Philippe Lang
    </div>
  );
};

export default Footer;
