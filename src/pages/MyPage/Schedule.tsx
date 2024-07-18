import React from "react";
import moment from "moment";
import CustomTooltip from "./CustomTooltip";
import { Tooltip } from "react-tooltip";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const scheduleData = [
  {
    day: "Monday",
    tasks: [
      {
        projectName: "[Fresher]_ReactJs Fresher",
        id: 122711,
        description: "Research API API API",
        status: "In Progress",
        startDate: "2024-07-01",
        dueDate: "2024-07-03",
        assignee: "John Doe",
        priority: "High",
      },
      {
        projectName: "Project B",
        id: 122712,
        description: "Task B1",
        status: "Not Started",
        startDate: "2024-07-01",
        dueDate: "2024-07-02",
        assignee: "Jane Smith",
        priority: "Medium",
      },
    ],
  },
  {
    day: "Tuesday",
    tasks: [
      {
        projectName: "[Fresher]_ReactJs Fresher",
        id: 122713,
        description: "Create components",
        status: "In Progress",
        startDate: "2024-07-02",
        dueDate: "2024-07-04",
        assignee: "Alice Johnson",
        priority: "High",
      },
    ],
  },
  {
    day: "Wednesday",
    tasks: [
      {
        projectName: "Project C",
        id: 122714,
        description: "Task C1",
        status: "Completed",
        startDate: "2024-07-03",
        dueDate: "2024-07-05",
        assignee: "Bob Brown",
        priority: "Low",
      },
      {
        projectName: "Project C",
        id: 122715,
        description: "Task C2",
        status: "In Progress",
        startDate: "2024-07-03",
        dueDate: "2024-07-06",
        assignee: "Charlie White",
        priority: "Medium",
      },
    ],
  },
  {
    day: "Thursday",
    tasks: [
      {
        projectName: "[Fresher]_ReactJs Fresher",
        id: 122716,
        description: "Fix bugs",
        status: "In Progress",
        startDate: "2024-07-04",
        dueDate: "2024-07-07",
        assignee: "David Green",
        priority: "High",
      },
    ],
  },
  {
    day: "Friday",
    tasks: [
      {
        projectName: "Project D",
        id: 122717,
        description: "Task D1",
        status: "Not Started",
        startDate: "2024-07-05",
        dueDate: "2024-07-08",
        assignee: "Eve Black",
        priority: "Medium",
      },
    ],
  },
  {
    day: "Saturday",
    tasks: [
      {
        projectName: "Project E",
        id: 122718,
        description: "Task E1",
        status: "In Progress",
        startDate: "2024-07-06",
        dueDate: "2024-07-09",
        assignee: "Frank Yellow",
        priority: "High",
      },
      {
        projectName: "Project E",
        id: 122719,
        description: "Task E2",
        status: "Completed",
        startDate: "2024-07-06",
        dueDate: "2024-07-10",
        assignee: "Grace Purple",
        priority: "Low",
      },
    ],
  },
  {
    day: "Sunday",
    tasks: [
      {
        projectName: "Project F",
        id: 122720,
        description: "Task F1",
        status: "Not Started",
        startDate: "2024-07-07",
        dueDate: "2024-07-11",
        assignee: "Hank Blue",
        priority: "Medium",
      },
    ],
  },
];
const fakeIssue = {
  tracker: { name: "Bug" },
  id: 123,
  subject: "Some issue subject",
  project: { name: "Sample Project" },
  status: { name: "Open" },
  start_date: "2024-07-18",
  due_date: "2024-07-25",
  assigned_to: { name: "John Doe" },
  priority: { name: "High" },
};

const Schedule: React.FC = () => {
  const startOfWeek = moment().startOf("week").add(1, "day");

  return (
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
      <thead className="bg-[#eeeeee] h-7">
        <tr>
          <th></th>
          {daysOfWeek.map((day, index) => (
            <th key={index} scope="col" className="p-1 text-xs">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 h-6">
        <tr key={1} className="h-28">
          <td className="bg-[#eeeeee] p-1 text-right align-top">{startOfWeek.week()}</td>
          {scheduleData.map((data, index) => (
            <td key={index} className="hover:bg-[#ffffdd] border border-gray-300 p-1 text-right align-top w-auto">
              {startOfWeek.clone().add(index, "day").format("DD")}
              {data.tasks.map((task, taskIndex) => (
                <div
                  data-tooltip-id={`tooltip-${task.id}`}
                  data-tooltip-variant="light"
                  key={taskIndex}
                  className="min-h-24 bg-[#ffffdd] border border-gray-300 text-center mb-4 flex flex-col justify-center cursor-pointer hover:bg-yellow-100"
                >
                  <p>{task.projectName}</p>
                  <p>
                    - Task #{task.id}: {task.description}
                  </p>
                  <Tooltip id={`tooltip-${task.id}`}>
                    <CustomTooltip issue={fakeIssue} />
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
