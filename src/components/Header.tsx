import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuItems, MenuItems2 } from "~/const/Menu";
import { Projects } from "~/const/Project";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectOverviewPage = location.pathname.includes("/projects/");

  const identifier = location.pathname.split("/")[2];
  const slug = location.pathname.split("/")[3];

  const handleNavigation = (slug: string) => {
    navigate(`/projects/${identifier}/${slug}`, { state: { projectName: title } });
  };

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

      <div className="flex flex-col justify-between h-88  text-white bg-primary ">
        <div className="flex justify-between items-start pt-1 px-2 pb-5 ">
          <h1 className="text-2xl font-bold">{title || "NTQ Redmine"}</h1>
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
              <button
                key={project.id}
                onClick={() => handleNavigation(project.slug)}
                className={`hover:underline text-xs duration-150 list-none px-3 py-1 font-bold ${slug === project.slug ? "bg-primary-sub_bg text-[#555]" : "bg-primary-light"}`}
              >
                {project.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
