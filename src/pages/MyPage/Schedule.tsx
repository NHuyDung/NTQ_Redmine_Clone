import React, { useEffect, useState } from "react";
import moment from "moment";
import CustomTooltip from "./CustomTooltip";
import { Tooltip } from "react-tooltip";
import { getIssue } from "../../services/IssueService";
import { GroupedIssues } from "../../types/Issue";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const startOfWeek = moment().startOf("week").add(1, "day");
const Schedule: React.FC = () => {
  const [issuesSchedule, setIssuesSchedule] = useState<GroupedIssues[]>([]);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const result = await getIssue();
        setIssuesSchedule(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchIssues();
  }, [issuesSchedule]);
  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 table-auto">
      <thead className="bg-[#eeeeee] h-7">
        <tr>
          <th className="w-7"></th>
          {daysOfWeek.map((day, index) => (
            <th key={index} scope="col" className="p-1 text-xs">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 ">
        <tr>
          <td className="bg-[#eeeeee] p-1 text-right align-top">{startOfWeek.week()}</td>
          {issuesSchedule.map((data, index) => (
            <td
              key={index}
              className="hover:bg-[#ffffdd] border border-gray-300 p-1 text-right align-top w-full sm:w-[50px] md:w-[100px] lg:w-[130px] xl:w-[180px]"
            >
              {startOfWeek.clone().add(index, "day").format("DD")}
              {data.tasks.map((task, taskIndex) => (
                <div
                  data-tooltip-id={`tooltip-${task.id}`}
                  data-tooltip-variant="light"
                  key={taskIndex}
                  className="min-h-16 p-4 bg-[#ffffdd] border border-gray-300 text-center mb-2 flex flex-col justify-center cursor-pointer hover:bg-yellow-100"
                >
                  <p className="text-xs">{task.project.name}</p>
                  <p className="text-xs">
                    - Task #{task.id}: {task.subject}
                  </p>
                  <Tooltip id={`tooltip-${task.id}`}>
                    <CustomTooltip {...task} />
                  </Tooltip>
                </div>
              ))}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Schedule;
