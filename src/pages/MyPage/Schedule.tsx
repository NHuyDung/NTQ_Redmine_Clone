import React from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const Schedule: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-[#eeeeee] h-7">
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index} scope="col" className="p-1 text-xs">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          <tr key={1} className="hover:bg-[#ffffdd] border border-gray-300 text-center">
            {Array.from({ length: 7 }, (_, index) => (
              <td key={index} className="border border-gray-300">
                1
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
