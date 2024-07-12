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
  // Add more issues as needed
];

const TableIssue: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
              #
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
              Project
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
              Tracker
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
              Subject
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300">{issue.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{issue.project}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{issue.tracker}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">{issue.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableIssue;
