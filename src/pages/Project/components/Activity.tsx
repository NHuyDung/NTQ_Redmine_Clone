import React, { useState, useEffect } from "react";
import { getIssueSchedule } from "~/services/IssueService";
import { timeEntries } from "~/services/ProjectService";
import { Issue } from "~/types/Issue";
import { formatDate } from "~/utils/FormatDay";
import moment from "moment";
import images from "~/assets/img";

interface Time {
  id: string;
  spent_on: string;
}
interface OverviewProps {
  identifier: string;
}

interface IssueData {
  id: number;
  createdOn: string;
  trackerName: string;
  authorName: string;
  statusName: string;
  description: string;
  subject: string;
}

const Activity: React.FC<OverviewProps> = ({ identifier }) => {
  const [time, setTime] = useState<Time[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

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
  console.log(time);

  // format VN time
  const formatTime = (date: string) => {
    const vietnamTime = moment.utc(date).add(7, "hours").format("HH:mm:ss A");
    return vietnamTime;
  };

  // Create a obj to save start_date not duplicate
  const startDateMap: { [key: string]: IssueData[] } = {};
  // for issues and Sort by hi start_date
  issues.forEach((issue) => {
    const startDate = issue.start_date;
    const id = issue.id;
    const trackerName = issue.tracker.name;
    const createdOn = issue.created_on;
    const authorName = issue.author.name;
    const statusName = issue.status.name;
    const description = issue.description;
    const subject = issue.subject;

    if (!startDateMap[startDate]) {
      startDateMap[startDate] = [];
    }
    startDateMap[startDate].push({ id, trackerName, createdOn, authorName, statusName, description, subject });
  });

  return (
    <div>
      <h2 className="text-lg font-semibold mb-1">Activity</h2>
      <div className="text-xs italic mb-3">From 06/30/2024 to 07/30/2024</div>
      {Object.keys(startDateMap).map((startDate) => (
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
      ))}
    </div>
  );
};

export default Activity;
