// Roadmap.tsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import images from "~/assets/img";
import { getProjectVersions, getProjectVersionsIssues } from "~/services/RoadmapService";
import { RootState } from "~/app/store";
import { setProjectVersions } from "~/features/Roadmap/projectVersionSlice";

interface Issue {
  fixed_version: {
    id: number;
  };
  tracker: {
    id: number;
    name: string;
  };
  id: number;
  subject: string;
  estimated_hours: number;
  done_ratio: number;
}

export interface ProjectVersion {
  id: number;
  name: string;
  due_date: string;
  description: string;
  status: string;
}

interface ProjectVersionsIssuesResponse {
  issues: Issue[];
}

const Roadmap = () => {
  const dispatch = useDispatch();
  const projectVersions = useSelector((state: RootState) => state.projectVersion.versions);
  const [versionCount, setVersionCount] = useState<Record<number, number>>({});
  const [issuesByVersion, setIssuesByVersion] = useState<Record<number, { issues: Issue[]; totalHours: number; hours: number }>>({});
  const showClosed = useSelector((state: RootState) => state.showClosed.showClosed);
  const showBug = useSelector((state: RootState) => state.showBug.showBug);
  const showTask = useSelector((state: RootState) => state.showTask.showTask);

  useEffect(() => {
    const fetchProjectVersions = async () => {
      try {
        const projectVersionsData = await getProjectVersions();
        dispatch(setProjectVersions(projectVersionsData));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjectVersions();
  }, [dispatch]);

  useEffect(() => {
    const fetchProjectVersionsIssues = async () => {
      try {
        const projectVersionsData: ProjectVersionsIssuesResponse = await getProjectVersionsIssues();
        const projectVersionDataIssues = projectVersionsData.issues;

        const fixedVersions = projectVersionDataIssues.map((issue) => issue.fixed_version.id);

        const versionCount = fixedVersions.reduce(
          (acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
          },
          {} as Record<number, number>,
        );

        const issuesByVersion = projectVersionDataIssues.reduce(
          (acc, issue) => {
            const versionId = issue.fixed_version.id;
            if (!acc[versionId]) {
              acc[versionId] = { issues: [], totalHours: 0, hours: 0 };
            }
            acc[versionId].issues.push(issue);
            acc[versionId].totalHours += issue.estimated_hours;
            acc[versionId].hours += (issue.estimated_hours * issue.done_ratio) / 100;
            return acc;
          },
          {} as Record<number, { issues: Issue[]; totalHours: number; hours: number }>,
        );

        setVersionCount(versionCount);
        setIssuesByVersion(issuesByVersion);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProjectVersionsIssues();
  }, []);

  return (
    <div>
      <h2 className="text-[#555] text-lg text-5 font-semibold mb-2 flex items-center justify-between">
        Roadmap
        <a className="flex items-center">
          <img src={images.add} className="mr-1" alt="Add" />
          <p className="text-primary text-xs font-normal">New version</p>
        </a>
      </h2>
      {projectVersions
        .filter((projectVersion) => showClosed || projectVersion.status === "open")
        .map((projectVersion) => {
          const versionData = issuesByVersion[projectVersion.id];

          const totalHours = versionData?.totalHours || 0;
          const hoursCompleted = versionData?.hours || 0;
          const percentCompleted = totalHours > 0 ? (hoursCompleted / totalHours) * 100 : 0;

          return (
            <div className="mb-6" key={projectVersion.id}>
              <h3 className="flex items-center">
                <img className="w-4 h-4" src={images.imagePackage} alt="Package" />
                <p className="text-[#169] hover:underline hover:text-[#b2290f] block text-base ml-1">{projectVersion.name}</p>
              </h3>
              <div className="text-sm mt-3 mb-2 flex items-center">
                <strong className="text-[#484848] text-5 font-bold pr-1.5">days late</strong>
                <p className="text-[#484848] text-xs">{projectVersion.due_date}</p>
              </div>
              <p className="mb-3 text-xs text-[#484848]">{projectVersion.description}</p>
              {versionData && versionData.issues.length > 0 ? (
                <div>
                  <div className="items-center">
                    <div className="flex items-center">
                      <table className="flex w-1/2">
                        <tbody className="w-full">
                          <tr className="flex">
                            <td className="border border-[#cccccc] bg-[#d3edd3] h-4" style={{ width: `${percentCompleted}%` }}></td>
                            <td className="border border-[#cccccc] bg-[#eeeeee] h-4" style={{ width: `${100 - percentCompleted}%` }}></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-xs text-[#484848] pl-1">{Math.round(percentCompleted)}%</div>
                    </div>
                    <div className="flex items-center text-xs text-primary">
                      <a>{versionCount[projectVersion.id] || 0} issues</a>
                      <p className="pr-1.5 pl-1.5">(0 closed -</p>
                      <a>{versionCount[projectVersion.id] || 0} open)</a>
                    </div>
                  </div>
                  <table className="mt-3 w-full">
                    <caption className="text-xs text-left text-[#484848] mb-2">Related issues</caption>
                    <tbody>
                      {versionData.issues
                        .filter((issue) => showBug || issue.tracker.name !== "Bug")
                        .filter((issue) => showTask || issue.tracker.name !== "Task")
                        .map((issue) => (
                          <tr key={issue.id}>
                            <td className="flex items-center border border-[#cccccc] max-w-full">
                              <a className="text-primary hover:underline hover:text-[#b2290f] text-xs">
                                {issue.tracker.name} #{issue.id}
                              </a>
                              <div className="text-xs text-[#484848]">: {issue.subject}</div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-[#484848]">No issues for this version.</p>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Roadmap;
