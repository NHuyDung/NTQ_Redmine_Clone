import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Import CSS for react-tabs

const TabProject = () => {
  const projects = [
    { id: 1, name: "Overview", detail: "Details of Overview" },
    { id: 2, name: "Activity", detail: "Details of Activity" },
    { id: 2, name: "Issues", detail: "Details of Issues" },
    { id: 2, name: "New issue", detail: "Details of New issue" },
    { id: 2, name: "Gantt", detail: "Details of Gantt" },
    { id: 2, name: "Calendar", detail: "Details of Calendar" },
    { id: 2, name: "Documents", detail: "Details of Documents" },
    { id: 2, name: "Wiki", detail: "Details of Wiki" },
    { id: 2, name: "Files", detail: "Details of Files" },
    { id: 2, name: "Settings", detail: "Details of Settings" },
  ];

  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold">Home</h2>
      <Tabs>
        <TabList className="react-tabs__tab--selected flex w-full gap-[1px] text-white">
          {projects.map((project) => (
            <Tab
              className="hover:cursor-pointer hover:underline text-xs bg-primary-light font-bold  px-3 py-1 outline-none rounded-none"
              key={project.id}
            >
              {project.name}
            </Tab>
          ))}
        </TabList>

        {projects.map((project) => (
          <TabPanel key={project.id}>
            <div className="p-3">
              <div className="flex">
                <h3 className="bg-image font-medium">{project.name}</h3>
              </div>
              <p className="pl-10 pt-3 text-sm">{project.detail}</p>
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TabProject;
