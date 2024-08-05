import React, { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import { DaysOfWeek } from "~/const/MyPage";
import CustomTooltip from "./CustomTooltip";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/app/store";
import { useSelector } from "react-redux";
import { fetchIssuesSchedule } from "~/features/issues/IssuesScheduleSlice";
import { RingLoader } from "react-spinners";
import { getStartOfWeek, isToday } from "~/utils/FormatDay";

const Schedule: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { issuesSchedule, loading: loadingSchedule } = useSelector((state: RootState) => state.issuesSchedule);
  useEffect(() => {
    if (issuesSchedule?.week.length === 0) {
      dispatch(fetchIssuesSchedule());
    }
  }, [dispatch, issuesSchedule?.week.length]);
  return (
    <>
      <p className="text-start mb-2">Calendar</p>
      {loadingSchedule ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
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
              <td className="bg-[#eeeeee] p-1 text-right align-top">{getStartOfWeek().week()}</td>
              {issuesSchedule?.week?.map((data, index) => {
                const currentDay = getStartOfWeek().clone().add(index, "day");
                const dayClassName = isToday(currentDay) ? "bg-[#ffffdd]" : "";
                return (
                  <td
                    key={index}
                    className={`border border-gray-300 p-1 text-right align-top w-full sm:w-[50px] md:w-[100px] lg:w-[130px] xl:w-[180px] ${dayClassName}`}
                  >
                    {currentDay.format("DD")}
                    {data.tasks?.map((task, taskIndex) => (
                      <div
                        data-tooltip-id={`tooltip-${task.id}-${taskIndex}`}
                        data-tooltip-variant="light"
                        key={taskIndex}
                        data-tooltip-offset={-100}
                        className="min-h-16 p-4 bg-[#ffffdd] border border-gray-300 text-left mb-2 cursor-pointer"
                      >
                        <div className="text-xs">
                          {task.project.name} -
                          <img src={task.img} alt="" className="mx-1 inline align-middle" />
                          <a href="#" className="text-primary-blue" rel="noreferrer noopener">
                            {task?.tracker.name} #{task.id}
                          </a>
                          : {task.subject}
                        </div>
                        <Tooltip id={`tooltip-${task.id}-${taskIndex}`} clickable={true}>
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
      )}
    </>
  );
};

export default Schedule;
