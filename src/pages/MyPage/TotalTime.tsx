import React from "react";
import MyPageAdd from "~/assets/img/mypage_add.png";
import MyPageEdit from "~/assets/img/mypage_edit.png";
import MyPageDelete from "~/assets/img/mypage_delete.png";

const issues = [
  { id: 1, activity: "Bug", project: "Project A", comment: "comment A", hours: "8.00" },
  { id: 2, activity: "Create", project: "Project B", comment: "comment B", hours: "8.00" },
];

const TotalTime: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between my-3">
        <h2 className="text-13">
          Total time:<span>8.00</span>
        </h2>
        <a href="/log-time" className="flex items-center gap-1 text-primary text-11 hover:underline hover:text-red-400">
          <img src={MyPageAdd} alt="add" />
          <span>Log time</span>
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
          {issues.map((issue) => (
            <>
              <tr className={"hover:bg-[#ffffdd] bg-[#f6f7f8]"}>
                <td className="p-1 text-center text-xs font-medium text-gray-900 border border-[#dcdcdc]">Today</td>
                <td colSpan={2} className="col-span p-1 text-left text-xs border border-[#dcdcdc]"></td>
                <td className="p-1 text-center text-xs border border-[#dcdcdc]">4.00</td>
                <td className="p-1 text-center text-xs border border-[#dcdcdc]"></td>
              </tr>
              <tr key={issue.id} className={"hover:bg-[#ffffdd]"}>
                <td className="p-1 text-center text-xs font-medium text-gray-900 border border-[#dcdcdc]">{issue.activity}</td>
                <td className="p-1 text-left text-xs border border-[#dcdcdc]">{issue.project}</td>
                <td className="p-1 text-left text-xs border border-[#dcdcdc]">{issue.comment}</td>
                <td className="p-1 text-center text-xs border border-[#dcdcdc]">{issue.hours}</td>
                <td className="flex justify-center gap-1 p-1 text-xs border border-[#dcdcdc] ">
                  <img src={MyPageEdit} alt="edit" />
                  <img src={MyPageDelete} alt="delete" />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalTime;
