import React, { useState, useEffect } from "react";
import { getIssueSchedule } from "~/services/IssueService";
import { timeEntries } from "~/services/ProjectService";
import { Issue } from "~/types/Issue";
import { formatDate } from "~/utils/FormatDay";
import moment from "moment";

interface Day {
  id: string;
  spent_on: string;
}
interface OverviewProps {
  identifier: string;
}

const Activity: React.FC<OverviewProps> = ({ identifier }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [issuesResult, daysResult] = await Promise.all([getIssueSchedule(), timeEntries(identifier)]);
        setDays(daysResult);
        setIssues(issuesResult);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProjects();
  }, [identifier]);
  console.log(days);

  // function filter same date
  // const uniqueDays = Array.from(new Set(days.map((day) => day.spent_on))).map((date) => ({
  //   id: date,
  //   spent_on: date,
  // }));

  // format VN time
  const formatTime = (date: string) => {
    const vietnamTime = moment.utc(date).add(7, "hours").format("HH:mm:ss");
    return vietnamTime;
  };
  const utcTime = "2024-07-30T02:12:13Z";
  console.log(formatTime(utcTime));

  // Create a obj to save start_date not duplicate
  const startDateMap: { [key: string]: string[] } = {};
  // for issues and Sort by hi start_date
  issues.forEach((issue) => {
    const StartDate = issue.start_date;
    const CreatedOn = issue.created_on;

    if (!startDateMap[StartDate]) {
      startDateMap[StartDate] = [];
    }
    startDateMap[StartDate].push(CreatedOn);
  });

  return (
    <div>
      <div className="text-lg font-semibold">Activity</div>
      <span className="text-xs italic">From 06/30/2024 to 07/30/2024</span>
      {Object.keys(startDateMap).map((startDate) => (
        <div key={startDate}>
          <div>
            <strong>Start Date:</strong> {formatDate(startDate)}
          </div>
          <div>
            <div>
              {startDateMap[startDate].map((createdOn, index) => (
                <div key={index}>{createdOn}</div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Activity;
