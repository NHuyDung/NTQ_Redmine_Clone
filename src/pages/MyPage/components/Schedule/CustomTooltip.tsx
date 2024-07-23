import React from "react";
import images from "~/assets/img";
import { Issue } from "../../../../types/Issue";

const CustomTooltip: React.FC<Issue> = (issue) => {
  console.log("issue", issue);
  return (
    <div>
      <div className="flex pb-5 items-center">
        {issue?.deadline ? <img src={images.arrow_left} alt="" /> : <img src={images.arrow_right} alt="" />}
        <a href="#!" className="text-primary-blue">
          {issue?.tracker.name} #{issue.id}
        </a>
        : {issue?.subject}
      </div>
      <div className="flex items-center gap-1">
        <span className="font-bold">Project:</span>
        {issue?.deadline ? <img src={images.arrow_left} alt="" /> : <img src={images.arrow_right} alt="" />}
        <a href="" className="text-primary-blue">
          {issue?.project.name}
        </a>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Status:</span>
        <span>{issue?.status.name}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Start date:</span>
        <span>{issue?.start_date}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Due date:</span>
        <span>{issue?.due_date}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Assignee:</span>
        <span>{issue?.assigned_to?.name}</span>
      </div>
      <div className="flex gap-1">
        <span className="font-bold">Priority:</span>
        <span>{issue?.priority?.name}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
