import React from "react";

interface Issue {
  id: number;
  project: string;
  tracker: string;
  subject: string;
}

const issues: Issue[] = [
  { id: 1, project: "Project A", tracker: "Bug", subject: "Issue with login" },
  { id: 2, project: "Project B", tracker: "Feature", subject: "Add new dashboard" },
  { id: 3, project: "Project C", tracker: "Support", subject: "Help with setup" },
];

const TableIssue: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-gray-200 border border-gray-300">
        <thead className="bg-[#eeeeee] h-7">
          <tr>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              #
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Project
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Tracker
            </th>
            <th scope="col" className="p-1 text-xs border border-[#dcdcdc]">
              Subject
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {issues.map((issue, index) => (
            <tr key={issue.id} className={`hover:bg-[#ffffdd] ${index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f6f7f8]"}`}>
              <td className="p-1 text-center text-xs font-medium text-gray-900 border border-[#dcdcdc]">{issue.id}</td>
              <td className="p-1 text-center text-xs border border-[#dcdcdc]">{issue.project}</td>
              <td className="p-1 text-center text-xs border border-[#dcdcdc]">{issue.tracker}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{issue.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableIssue;
