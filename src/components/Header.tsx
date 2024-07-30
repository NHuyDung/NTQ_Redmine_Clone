import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuItems, MenuItems2 } from "~/const/Menu";
import { Projects } from "~/const/Project";

const Header = () => {
  const location = useLocation();
  const isProjectOverviewPage = location.pathname.includes("/projects/");

  const identifier = location.pathname.split("/")[2];

  return (
    <div className="">
      <div className=" flex items-center justify-between p-2 bg-primary-dark h-5 text-10">
        <ul className="flex text-white gap-2 font-bold ">
          {MenuItems.map((item) => (
            <Link key={item.id} to={item.href} className="hover:underline duration-150 list-none">
              {item.label}
            </Link>
          ))}
        </ul>
        <ul className="flex text-white gap-2 font-bold">
          <li className="font-normal">
            Logged in as
            <a href="" className="ml-1 font-bold" rel="noreferrer noopener">
              duc.nguyen14@ntq-solution.com.vn
            </a>
          </li>
          {MenuItems2.map((item) => (
            <Link key={item.id} to={item.href} className="hover:underline duration-150 list-none">
              {item.label}
            </Link>
          ))}
        </ul>
      </div>

      <div className="h-88  text-white bg-primary ">
        <div className="flex justify-between items-start pt-1 px-2 pb-5 ">
          <h1 className="text-2xl font-bold">NTQ Redmine</h1>
          <div className="flex gap-2 text-black text-sm">
            <label className="text-white pr-2" htmlFor="search">
              Search:
            </label>
            <input id="search" className="" type="text" name="search" />
            <select className="text-black text-xs" defaultValue="*">
              <option value="*" hidden>
                Jump to a project...
              </option>
              <option value="redmine">Redmine</option>
              <option value="fresher">[Fresher]_ ReactJS Fresher</option>
            </select>
          </div>
        </div>

        {isProjectOverviewPage && (
          <div className="flex gap-0.5 ml-2">
            {Projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${identifier}/${project.slug}`}
                className="hover:underline bg-primary-light text-xs duration-150 list-none px-3 py-1 "
              >
                {project.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
