import React from "react";

const issues = [
  { id: 1, activity: "Today", project: "Project A", comment: "comment A", hours: "8.00" },
  { id: 2, activity: "Create", project: "Project B", comment: "comment B", hours: "8.00" },
];

const TotalTime: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2>
          Total time:<span>8.00</span>
        </h2>
        <a href="/log-time" className="">
          Log time
        </a>
      </div>
      <table className="min-w-full divide-gray-200 border border-gray-300">
        <thead className="bg-[#eeeeee] h-7">
          <tr>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Activity
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Project
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Comment
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Hours
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {issues.map((issue, index) => (
            <tr key={issue.id} className={`hover:bg-[#ffffdd] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f6f7f8]"}`}>
              <td className="p-1 text-center text-xs font-medium text-gray-900 border border-[#dcdcdc]">{issue.activity}</td>
              <td className="p-1 text-center text-xs border border-[#dcdcdc]">{issue.project}</td>
              <td className="p-1 text-center text-xs border border-[#dcdcdc]">{issue.comment}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{issue.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalTime;
