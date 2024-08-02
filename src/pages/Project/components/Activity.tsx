// src/components/Activity.tsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { getIssueSchedule } from "~/services/IssueService";
import { timeEntries } from "~/services/ProjectService";
import { Issue } from "~/types/Issue";
import { formatDate, formatTime } from "~/utils/FormatDay";
import images from "~/assets/img";
// import SubActivity from "./SubActivity";

interface Time {
  activity: { id: number; name: string };
  id: string;
  spent_on: string;
  comments: string;
  created_on: string;
  user: { id: number; name: string };
  hours: number;
  issue?: { id: number };
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
  const groupedData = data.reduce(
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

  // Sort items in each date group by time (created_on)
  Object.keys(groupedData).forEach((date) => {
    groupedData[date].sort((a, b) => new Date(b.created_on).getTime() - new Date(a.created_on).getTime());
  });

  return groupedData;
};

const Activity: React.FC<OverviewProps> = ({ identifier }) => {
  const [time, setTime] = useState<Time[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [data, setData] = useState<DataSample[]>([]);
  const filters = useSelector((state: RootState) => state.filter);

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

    const timeEntriesDataSample = time.map((entry) => {
      const relatedIssue = entry.issue ? issues.find((issue) => issue.id === entry.issue?.id) : undefined;
      return {
        title: entry.activity.name,
        type: "timeEntries",
        description: entry.comments,
        author: {
          id: entry.user.id,
          name: entry.user.name,
        },
        created_on: entry.created_on,
        hours: entry.hours,
        trackerName: relatedIssue?.tracker.name,
        statusName: relatedIssue?.status.name,
        subject: relatedIssue?.subject,
        id: entry.issue?.id,
      };
    });

    setData([...issuesDataSample, ...timeEntriesDataSample]);
  }, [issues, time]);

  const filteredData = data.filter((item) => {
    if (item.type === "issue" && filters.showIssues) {
      return true;
    }
    if (item.type === "timeEntries" && filters.showTimeEntries) {
      return true;
    }
    return false;
  });

  const groupedData = groupByDate(filteredData);
  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div>
      {/* <SubActivity /> */}
      <h2 className="text-lg font-semibold mb-1 text-[#555]">Activity</h2>
      <div className="text-xs italic mb-3">From 06/30/2024 to 07/30/2024</div>

      {sortedDates.map((date) => (
        <div key={date} className="mb-4">
          <h2 className="font-semibold mb-2 text-[#555]">{formatDate(date)}</h2>
          <div className="ml-6 my-3">
            {groupedData[date].map((item, index) => (
              <div key={index} className="flex items-start mb-2.5">
                <img src={item.type === "issue" ? images.ticket_overview : images.time} alt={item.type === "issue" ? "ticket" : "time"} />
                <img className="border border-primary-border mr-3 ml-1.5 p-0.5" src={images.avatar} alt="avatar" />
                <div className="flex flex-col justify-center items-start">
                  <div className="flex items-end gap-1">
                    <span className="text-10 text-[#777]">{formatTime(item.created_on)}</span>
                    {item.type === "issue" ? (
                      <a className="text-xs text-[#169] font-medium cursor-pointer hover:underline hover:text-[#b2290f]" href={`/issues/${item.id}`}>
                        {item.trackerName} #{item.id} ({item.statusName}): {item.subject}
                      </a>
                    ) : (
                      <span className="text-xs text-[#169] font-medium">
                        {(item.hours ?? 0).toFixed(2)} hours - {item.statusName}: {item.subject}
                      </span>
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
    </div>
  );
};

export default Activity;
