import React, { useEffect, useState } from "react";
import moment from "moment";
import images from "~/assets/img";
import { Tooltip } from "react-tooltip";
import { getIssueSchedule } from "~/services/IssueService";
import { GroupedIssues } from "~/types/Issue";
import { DaysOfWeek } from "~/const/MyPage";
import CustomTooltip from "./CustomTooltip";
const startOfWeek = moment().startOf("week").add(1, "day");
const Schedule: React.FC = () => {
  const [issuesSchedule, setIssuesSchedule] = useState<GroupedIssues[]>([]);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const result = await getIssueSchedule();
        setIssuesSchedule(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchIssues();
  }, []);
  const isToday = (date: moment.Moment) => {
    return date.isSame(moment(), "day");
  };
  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300 table-auto">
      <thead className="bg-[#eeeeee] h-7">
        <tr>
          <th className="w-7"></th>
          {DaysOfWeek.map((day) => (
            <th key={day.id} scope="col" className="p-1 text-xs">
              {day.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 ">
        <tr>
          <td className="bg-[#eeeeee] p-1 text-right align-top">{startOfWeek.week()}</td>
          {issuesSchedule.map((data, index) => {
            const currentDay = startOfWeek.clone().add(index, "day");
            const dayClassName = isToday(currentDay) ? "bg-[#ffffdd]" : "";

            return (
              <td
                key={index}
                className={`border border-gray-300 p-1 text-right align-top w-full sm:w-[50px] md:w-[100px] lg:w-[130px] xl:w-[180px] ${dayClassName}`}
              >
                {currentDay.format("DD")}
                {data.tasks.map((task, taskIndex) => (
                  <div
                    data-tooltip-id={`tooltip-${task.id}-${taskIndex}`}
                    data-tooltip-variant="light"
                    key={taskIndex}
                    className="min-h-16 p-4 bg-[#ffffdd] border border-gray-300 text-left mb-2 cursor-pointer"
                  >
                    <div className="text-xs">
                      {task.project.name} -
                      {task?.deadline ? (
                        <img src={images.arrow_left} alt="arrow_left" className="mx-1 inline align-middle" />
                      ) : (
                        <img src={images.arrow_right} alt="arrow_right" className="mx-1 inline align-middle" />
                      )}
                      <a href="#" className="text-primary-blue" rel="noreferrer noopener">
                        {task?.tracker.name} #{task.id}
                      </a>
                      : {task.subject}
                    </div>
                    <Tooltip id={`tooltip-${task.id}-${taskIndex}`}>
                      <CustomTooltip {...task} />
                    </Tooltip>
                  </div>
                ))}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Schedule;
