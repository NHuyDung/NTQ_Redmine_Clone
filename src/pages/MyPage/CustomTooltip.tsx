import React from "react";
import ArrowRightIcon from "../../assets/images/bullet_go.png";

interface Issue {
  tracker: { name: string };
  id: number;
  subject: string;
  project: { name: string };
  status: { name: string };
  start_date: string;
  due_date: string;
  assigned_to: { name: string };
  priority: { name: string };
}

interface CustomTooltipProps {
  issue: Issue;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ issue }) => {
  console.log("issue:", issue);
  console.log("issue.tracker.name:", issue.tracker.name);

  return (
    <div>
      <div className="flex pb-5 items-center">
        <img src={ArrowRightIcon} alt="" />
        <a href="#!" className="text-ocean-blue">
          {issue.tracker.name} #{issue.id}
        </a>
        : {issue.subject}
      </div>

      <div className="flex items-center gap-1">
        <span className="font-bold">Project:</span>
        <a href="" className="text-[#116699]">
          {issue.project.name}
        </a>
      </div>

      <div className="flex gap-1">
        <span className="font-bold">Status:</span>
        <span>{issue.status.name}</span>
      </div>

      <div className="flex gap-1">
        <span className="font-bold">Start date:</span>
        <span>{issue.start_date}</span>
      </div>

      <div className="flex gap-1">
        <span className="font-bold">Due date:</span>
        <span>{issue.due_date}</span>
      </div>

      <div className="flex gap-1">
        <span className="font-bold">Assignee:</span>
        <span>{issue.assigned_to.name}</span>
      </div>

      <div className="flex gap-1">
        <span className="font-bold">Priority:</span>
        <span>{issue.priority.name}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
