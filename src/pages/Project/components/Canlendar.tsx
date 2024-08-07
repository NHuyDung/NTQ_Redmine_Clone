import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { DaysOfWeek } from "~/const/MyPage";
import CustomTooltip from "../../MyPage/components/Schedule/CustomTooltip";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "~/app/store";
import { useSelector } from "react-redux";
import { fetchIssuesSchedule } from "~/features/issues/IssuesScheduleSlice";
import { RingLoader } from "react-spinners";
import { getLastWeekOfPreviousMonth, isToday } from "~/utils/FormatDay";
import images from "~/assets/img";

const Calendar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const { issuesSchedule, loading: loadingSchedule } = useSelector((state: RootState) => state.issuesSchedule);

  useEffect(() => {
    if (issuesSchedule?.month.length === 0) {
      dispatch(fetchIssuesSchedule());
    }
  }, [dispatch, issuesSchedule?.month.length]);

  const startOfLastWeek = getLastWeekOfPreviousMonth();
  const endDate = startOfLastWeek.clone().add(35, "days");
  const daysArray = [];
  const currentDay = startOfLastWeek.clone();
  while (currentDay.isBefore(endDate)) {
    daysArray.push(currentDay.clone());
    currentDay.add(1, "day");
  }
  const handleToggleFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  return (
    <>
      <p className="text-start mb-2 font-bold">Calendar</p>

      {loadingSchedule ? (
        <div className="flex justify-center items-center h-24">
          <RingLoader color="#34d2c8" speedMultiplier={2} />
        </div>
      ) : (
        <>
          <div>
            <fieldset className="mb-4">
              <legend onClick={handleToggleFilter} className="cursor-pointer pb-2 text-xs">
                {!isOpenFilter ? (
                  <img className="inline w-3" alt="collapsed" src="https://redmine.ntq.solutions/images/arrow_collapsed.png"></img>
                ) : (
                  <img className="inline w-3" alt="expanded" src="https://redmine.ntq.solutions/images/arrow_expanded.png"></img>
                )}
                Filters
              </legend>
              {!isOpenFilter ? null : (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <input type="checkbox" id="cb_status_id"></input>
                    <label htmlFor="cb_status_id" className="pl-1 text-xs">
                      Status
                    </label>
                  </div>
                  <select id="operators_status_id" className="border border-primary-border w-16 h-6 text-xs">
                    <option className="text-xs" value="">
                      All
                    </option>
                    <option className="text-xs" value="open">
                      Open
                    </option>
                    <option className="text-xs" value="resolved">
                      Resolved
                    </option>
                    <option className="text-xs" value="closed">
                      Closed
                    </option>
                  </select>

                  <span></span>

                  <div>
                    <label htmlFor="add_filter_select" className="pr-1">
                      Add filter
                    </label>
                    <select id="add_filter_select" className="border border-primary-border w-32 h-6 text-xs">
                      <option className="text-xs" value="">
                        All
                      </option>
                      <option className="text-xs" value="created_on">
                        Created on
                      </option>
                      <option className="text-xs" value="updated_on">
                        Updated on
                      </option>
                      <option className="text-xs" value="due_date">
                        Due date
                      </option>
                    </select>
                  </div>
                </div>
              )}
            </fieldset>
          </div>
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
            <tbody className="bg-white divide-y divide-gray-200">
              {daysArray
                .reduce((rows, day, index) => {
                  if (index % DaysOfWeek.length === 0) {
                    rows.push([]);
                  }
                  rows[rows.length - 1].push(day);
                  return rows;
                }, [] as moment.Moment[][])
                .map((weekDays, weekIndex) => (
                  <tr key={weekIndex}>
                    <td className="bg-[#eeeeee] p-1 text-right align-top">{weekDays[0].clone().startOf("week").format("W")}</td>
                    {weekDays.map((currentDay, dayIndex) => {
                      const dayData = issuesSchedule?.month?.find((data) => data.day === currentDay.format("YYYY-MM-DD"));
                      const dayClassName = isToday(currentDay) ? "bg-[#ffffdd]" : "";
                      return (
                        <td
                          key={dayIndex}
                          className={`border border-gray-300 p-1 text-right align-top w-full sm:w-[50px] md:w-[100px] lg:w-[130px] xl:w-[180px] ${dayClassName}`}
                        >
                          {currentDay.format("DD")}
                          {dayData?.tasks?.map((task, taskIndex) => (
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
                ))}
            </tbody>
          </table>
          <span className="flex">
            <img src={images.arrow_right}></img>issue beginning this day
          </span>
          <span className="flex">
            <img src={images.arrow_left}></img>issue ending this day
          </span>
          <span className="flex">
            <img src={images.diamond}></img>issue beginning and ending this day
          </span>
        </>
      )}
    </>
  );
};

export default Calendar;
