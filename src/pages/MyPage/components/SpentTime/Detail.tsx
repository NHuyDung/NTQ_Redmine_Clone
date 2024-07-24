import React from "react";
import images from "~/assets/img";
import { formatDate } from "~/utils/FormatDay";
import { SpentTimeType } from "~/types/MyPage";

interface DetailProps {
  data: SpentTimeType[];
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
              <td className="p-1 text-left text-xs border border-[#dcdcdc]">{formatDate(item.spent_on)}</td>
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
      <span className="text-11 text-[#484848] my-2">(1-15)/15</span>

      <div className="flex items-center gap-1 justify-end text-11">
        <span>Also available in: CSV</span>
        <a className="flex items-center gap-1 text-primary hover:underline hover:text-red-400" href="">
          <img src={images.feed} alt="feed" />
          Atom
        </a>
        <span>|</span>
        <a href="" className="text-primary  text-11 hover:underline hover:text-red-400">
          CSV
        </a>
      </div>
    </div>
  );
};

export default Detail;
