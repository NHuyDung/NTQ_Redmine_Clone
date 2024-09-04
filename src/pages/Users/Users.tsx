import React, { useEffect, useState } from "react";
import images from "~/assets/img";
import { useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { useParams } from "react-router-dom";
import { formatDate, formatTime } from "~/utils/FormatDay";
import { getUserDetail } from "~/services/ProjectService";
import { getIssueSchedule } from "~/services/IssueService";
import { Issue } from "~/types/Issue";
import { Link } from "react-router-dom";

interface User {
  created_on: string;
  firstname: string;
  id: number;
  last_login_on: string;
  lastname: string;
  mail: string;
}

interface ActivityItem {
  start_date: string;
  created_on: string;
  project: {
    name: string;
  };
  tracker: {
    name: string;
  };
  id: number;
  status: {
    name: string;
  };
  subject: string;
}

const groupByStartDate = (activities: ActivityItem[]) => {
  return activities.reduce(
    (acc, activity) => {
      const date = activity.start_date;

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(activity);
      return acc;
    },
    {} as Record<string, ActivityItem[]>,
  );
};

const Users: React.FC = () => {
  const { user_id } = useParams<{ user_id: string }>();
  const [userData, setUserData] = useState<User>();
  const [issueSchedule, setIssueSchedule] = useState<Issue[]>();
  const [loading, setLoading] = useState(true);

  const members = useSelector((state: RootState) => state.members);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user_id) {
          const [userResponse, issueScheduleResponse] = await Promise.all([getUserDetail(user_id), getIssueSchedule()]);
          setUserData(userResponse);
          setIssueSchedule(issueScheduleResponse);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user_id]);

  const selectedMember = userData ? members.members.find((member) => member.user.id === userData.id) : null;

  const myActivity: ActivityItem[] = userData
    ? issueSchedule
        ?.filter((issue) => issue.author?.id === userData.id)
        .map((issue) => ({
          start_date: issue.start_date || "",
          created_on: issue.created_on || "",
          project: issue.project || { name: "" },
          tracker: issue.tracker || { name: "" },
          id: issue.id,
          status: issue.status || { name: "" },
          subject: issue.subject || "",
        })) || []
    : [];

  const groupedActivities = groupByStartDate(myActivity);
  console.log(groupedActivities);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="">
      <div className="bg-white grid gap-2">
        <div className="flex items-center col-span-2 mb-4">
          <div className="border p-1">
            <img src={images.avatar} alt="avatar" className="size-12" />
          </div>

          <div className="ml-4">
            <h2 className="text-lg font-bold text-[#555]">
              {userData.firstname} {userData.lastname}
            </h2>
          </div>
        </div>

        <div className="pr-4">
          <ul className="text-xs ml-8 text-gray-600 list-disc list-inside">
            <li>
              Email:
              <a className="text-[#169] hover:text-[#c61a1a] hover:underline" href="">
                {userData.mail}
              </a>
            </li>
            <li>Registered on: {formatDate(userData.created_on, true)}</li>
            <li>Last connection: {formatDate(userData.last_login_on, true)}</li>
          </ul>
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700">Projects</h3>
            <ul className="ml-8 text-gray-600 list-disc list-inside text-xs">
              <li>
                <Link className="text-[#169] hover:text-[#c61a1a] hover:underline" to="">
                  {selectedMember?.project.name}{" "}
                </Link>
                ({selectedMember?.roles[0].name}, 07/08/2024)
              </li>
            </ul>
          </div>
        </div>

        <div className="pl-4">
          <a href="" className=" font-semibold text-[#169]">
            Activity
          </a>
          <p className="text-xs text-[#484848] mb-2">Reported issues: {myActivity.length}</p>
          <div className="space-y-4">
            {Object.entries(groupedActivities).map(([date, activities]) => {
              // Log each date and activities

              return (
                <div key={date}>
                  <p className="text-13 text-[#555]">{date}</p>
                  {activities.map((activity, index) => {
                    // Log each activity
                    console.log("Activity:", activity);

                    return (
                      <div key={index}>
                        <div className="flex items-center gap-1 ml-6 my-3 text-xs">
                          <img src={images.ticket} alt="ticket" />
                          <span className="text-10 text-[#777]">{formatTime(activity.created_on)}</span>
                          <span className="">{activity.project.name} -</span>
                          <span className="text-[#169] hover:text-[#c61a1a] hover:underline">
                            {" "}
                            {activity.tracker.name} #{activity.id} ({activity.status.name}) {activity.subject}
                          </span>
                        </div>
                        {/* <p className="text-xs text-gray-500">{activity.comment || "No comment"}</p> */}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 text-11 my-3">
        <span>Also available in:</span>
        <a className="flex items-center gap-0.5 text-[#169] hover:underline hover:text-[#b2290f]" href="">
          <img src={images.feedproject} alt="" />
          <span>Atom</span>
        </a>
      </div>
    </div>
  );
};

export default Users;
