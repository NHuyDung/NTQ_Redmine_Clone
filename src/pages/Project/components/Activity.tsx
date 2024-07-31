import React, { useState, useEffect } from "react";
import { getIssueSchedule } from "~/services/IssueService";
import { timeEntries } from "~/services/ProjectService";
import { Issue } from "~/types/Issue";
import { formatDate } from "~/utils/FormatDay";
import moment from "moment";
import images from "~/assets/img";

interface Time {
  activity: { id: number; name: string };
  id: string;
  spent_on: string;
  comments: string;
  created_on: string;
  user: { id: number; name: string };
  hours: number;
  issue: { id: number };
}
interface OverviewProps {
  identifier: string;
}

interface DataSample {
  title: string;
  type: string;
  description: string;
  author: { id: number; name: string };
  created_on: string;
  trackerName?: string;
  statusName?: string;
  subject?: string;
  id?: number;
  hours?: number;
}

const groupByDate = (data: DataSample[]) => {
  return data.reduce(
    (acc, item) => {
      const date = item.created_on.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    },
    {} as Record<string, DataSample[]>,
  );
};

const Activity: React.FC<OverviewProps> = ({ identifier }) => {
  const [time, setTime] = useState<Time[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [data, setData] = useState<DataSample[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [issuesResult, timeResult] = await Promise.all([getIssueSchedule(), timeEntries(identifier)]);
        setIssues(issuesResult);
        setTime(timeResult);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProjects();
  }, [identifier]);

  // format VN time
  const formatTime = (date: string) => {
    const vietnamTime = moment.utc(date).add(7, "hours").format("h:mm A");
    return vietnamTime;
  };

  useEffect(() => {
    const issuesDataSample = issues.map((issue) => ({
      title: issue.subject,
      type: "issue",
      description: issue.description,
      author: {
        id: issue.author.id,
        name: issue.author.name,
      },
      created_on: issue.created_on,
      trackerName: issue.tracker.name,
      statusName: issue.status.name,
      subject: issue.subject,
      id: issue.id,
    }));

    const timeEntriesDataSample = time.map((entry) => ({
      title: entry.activity.name,
      type: "timeEntries",
      description: entry.comments,
      author: {
        id: entry.user.id,
        name: entry.user.name,
      },
      created_on: entry.created_on,
      hours: entry.hours,
    }));

    setData([...issuesDataSample, ...timeEntriesDataSample]);
  }, [issues, time]);

  const groupedData = groupByDate(data);

  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  return (
    <div>
      <h2 className="text-lg font-semibold mb-1 text-[#555]">Activity</h2>
      <div className="text-xs italic mb-3">From 06/30/2024 to 07/30/2024</div>

      {sortedDates.map((date) => (
        <div key={date} className="mb-4">
          <h2 className=" font-semibold mb-2 text-[#555]">{formatDate(date)}</h2>
          <div className="ml-6 my-3">
            {groupedData[date].map((item, index) => (
              <div key={index} className="flex items-start mb-2.5">
                <img src={item.type === "issue" ? images.ticket_overview : images.time} alt={item.type === "issue" ? "ticket" : "time"} />
                {/* <img src={images.ticket_overview} alt="ticket" /> */}
                <img className="border border-primary-border mr-3 ml-1.5 p-0.5" src={images.avatar} alt="avatar" />
                <div className="flex flex-col justify-center items-start">
                  <div className="flex items-end gap-1">
                    <span className="text-10 text-[#777]">{formatTime(item.created_on)}</span>
                    {item.type === "issue" ? (
                      <a className="text-xs text-[#169] font-medium cursor-pointer hover:underline hover:text-[#b2290f]" href={`/issues/${item.id}`}>
                        {item.trackerName} #{item.id} ({item.statusName}): {item.subject}
                      </a>
                    ) : (
                      <span className="text-xs text-[#169] font-medium">{(item.hours ?? 0).toFixed(2)} hours</span>
                    )}
                  </div>
                  <span className="text-11 italic text-[#808080]">{item.description}</span>
                  <a href={`/users/${item.author.id}`} className="text-11 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
                    {item.author.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* {Object.keys(startDateMap).map((startDate) => (
        <div key={startDate}>
          <h3 className="text-[#555] font-bold mb-2.5">{formatDate(startDate)}</h3>
          <div className="ml-6 my-3">
            {startDateMap[startDate].map((issue, index) => (
              <div key={index} className="flex items-start mb-3">
                <img src={images.ticket_overview} alt="ticket" />
                <img className="border border-primary-border mr-3 ml-1.5 p-0.5" src={images.avatar} alt="avatar" />
                <div className="flex flex-col justify-center items-start">
                  <div className="flex items-center gap-1">
                    <span className="text-10 text-[#777]">{formatTime(issue.createdOn)}</span>
                    <a className="text-xs text-[#169] font-medium cursor-pointer  hover:underline hover:text-[#b2290f]" href="/issues/122966">
                      {issue.trackerName} #{issue.id} ({issue.statusName}): {issue.subject}
                    </a>
                  </div>
                  <span className="text-11 italic text-[#808080]">{issue.description}</span>
                  <a href="/users/2805" className="text-11 text-[#169] cursor-pointer  hover:underline hover:text-[#b2290f]">
                    {issue.authorName}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Activity;

// // Create a obj to save start_date not duplicate
// const startDateMap: { [key: string]: IssueData[] } = {};
// // for issues and Sort by hi start_date
// issues.forEach((issue) => {
//   const startDate = issue.start_date;
//   const id = issue.id;
//   const trackerName = issue.tracker.name;
//   const createdOn = issue.created_on;
//   const authorName = issue.author.name;
//   const statusName = issue.status.name;
//   const description = issue.description;
//   const subject = issue.subject;

//   if (!startDateMap[startDate]) {
//     startDateMap[startDate] = [];
//   }
//   startDateMap[startDate].push({ id, trackerName, createdOn, authorName, statusName, description, subject });
// });
