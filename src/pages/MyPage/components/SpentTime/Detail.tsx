import React from "react";
import images from "~/assets/img";

interface SpentTime {
  id: number;
  project: {
    id: number;
    name: string;
  };
  spent_on: string;
  user: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  issue: {
    id: number;
  };
  comments: string;
  hours: number;
}

interface DetailProps {
  data: SpentTime[];
}

const Detail: React.FC<DetailProps> = ({ data }) => {
  return (
    <div>
      <h2>Detail View</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="p-1 text-xs border border-[#dcdcdc]"></th>
            <th className="p-1 text-xs border border-[#dcdcdc]">Project</th>
            <th className="p-1 text-xs border border-[#dcdcdc]">Date</th>
            <th className="p-1 text-xs border border-[#dcdcdc]">User</th>
            <th className="p-1 text-xs border border-[#dcdcdc]">Activity</th>
            <th className="p-1 text-xs border border-[#dcdcdc]">Issue</th>
            <th className="p-1 text-xs border border-[#dcdcdc]">Comment</th>
            <th className="p-1 text-xs border border-[#dcdcdc]">Hours</th>
            <th className="p-1 text-xs border border-[#dcdcdc]"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 h-6">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">
                <input type="checkbox" />
              </td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.project.name}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.spent_on}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.user.name}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.activity.name}</td>
              <td className=" p-1 text-left text-xs last:border-b border-[#dcdcdc] flex gap-1">
                <a className="" href="">
                  Bug #122815:
                </a>
                <div className=""> API issue</div>
              </td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.comments}</td>
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{item.hours}</td>
              <td className="flex justify-center items-end pb-3 gap-1 p-1 text-xs border border-[#dcdcdc] ">
                <a href="" className="h-full">
                  <img src={images.edit} alt="edit" />
                </a>
                <a href="" className="h-full">
                  <img src={images.remove} alt="delete" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Detail;
