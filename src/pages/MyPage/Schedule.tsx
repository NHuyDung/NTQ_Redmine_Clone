import React from "react";
import moment from "moment";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const scheduleData = [
  {
    day: "Monday",
    tasks: [
      { projectName: "[Fresher]_ReactJs Fresher", id: 122711, description: "Research API API API" },
      { projectName: "Project B", id: 122712, description: "Task B1" },
    ],
  },
  {
    day: "Tuesday",
    tasks: [{ projectName: "[Fresher]_ReactJs Fresher", id: 122713, description: "Create components" }],
  },
  {
    day: "Wednesday",
    tasks: [
      { projectName: "Project C", id: 122714, description: "Task C1" },
      { projectName: "Project C", id: 122715, description: "Task C2" },
    ],
  },
  {
    day: "Thursday",
    tasks: [{ projectName: "[Fresher]_ReactJs Fresher", id: 122716, description: "Fix bugs" }],
  },
  {
    day: "Friday",
    tasks: [{ projectName: "Project D", id: 122717, description: "Task D1" }],
  },
  {
    day: "Saturday",
    tasks: [
      { projectName: "Project E", id: 122718, description: "Task E1" },
      { projectName: "Project E", id: 122719, description: "Task E2" },
    ],
  },
  {
    day: "Sunday",
    tasks: [{ projectName: "Project F", id: 122720, description: "Task F1" }],
  },
];
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
      <tbody className="bg-white divide-y divide-gray-200 h-6 cursor-pointer">
        <tr key={1} className="h-28">
          <td className="bg-[#eeeeee] p-1 text-right align-top">{startOfWeek.week()}</td>
          {scheduleData.map((data, index) => (
            <td key={index} className="hover:bg-[#ffffdd] border border-gray-300 p-1 text-right align-top w-auto">
              {startOfWeek.clone().add(index, "day").format("DD")}
              {data.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="min-h-24 bg-[#ffffdd] border border-gray-300 text-center mb-4 flex flex-col justify-center">
                  <p>{task.projectName}</p>
                  <p>
                    - Task #{task.id}: {task.description}
                  </p>
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
