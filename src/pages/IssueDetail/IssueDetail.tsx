import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import images from "~/assets/img";
import SubIssues from "~/components/SubMain/components/SubIssues";
import { OPTION_DIALOG } from "~/const/Project";
import { getIssuesDetail } from "~/services/ProjectService";
import { formatDate } from "~/utils/FormatDay";
import { Link } from "react-router-dom";
import { Issue } from "~/types/Issue";

// interface CustomField {
//   id: number;
//   name: string;
//   value: string | string[]; // value có thể là string hoặc array of strings
//   multiple?: boolean; // multiple là tùy chọn và có thể có hoặc không
// }

// interface Issue {
//   id: number;
//   tracker?: {
//     id: number;
//     name: string;
//   };
//   subject?: string;
//   author?: {
//     id: number;
//     name: string;
//   };
//   status?: {
//     id: number;
//     name: string;
//   };
//   priority?: {
//     id: number;
//     name: string;
//   };
//   assigned_to?: {
//     id: number;
//     name: string;
//   };
//   fixed_version?: {
//     id: number;
//     name: string;
//   };
//   custom_fields?: CustomField[];
//   start_date?: string;
//   due_date?: string;
//   done_ratio?: number;
//   estimated_hours?: number;
//   spent_hours?: number;
//   description?: string;
//   CauseCategory?: string;
//   "IsDegrade?"?: boolean;
//   Reopencounter?: number;
//   BugType?: string;
//   Severity?: string;
//   QCActivity?: string;
//   created_on?: string;
// }

const IssueDetail = () => {
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showRelatedIssueForm, setShowRelatedIssueForm] = useState(false);

  const { issue_id } = useParams<{ issue_id: string }>();
  useEffect(() => {
    const fetchIssueDetail = async () => {
      try {
        const issueDetail = await getIssuesDetail(issue_id!);
        setIssue(issueDetail);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchIssueDetail();
  }, [issue_id]);

  const toggleRelatedIssueForm = () => {
    setShowRelatedIssueForm((prev) => !prev);
  };

  const handleMagnifierClick = () => {
    document.getElementById("issueInput")?.focus();
  };

  console.log(issue, loading);

  return (
    <div className="flex gap-2">
      <div className="min-h-84 flex flex-col gap-2 bg-white px-3 mt-3 border pb-6 w-9/12">
        <div className="flex justify-between mt-2 items-center">
          <h2 className="text-mouse-gray font-bold ">{issue ? `${issue.tracker?.name} #${issue?.id} ` : ""}</h2>
          <div className="flex gap-2 text-10 text-ocean-blue">
            <button className="flex gap-1 hover:underline">
              <img src={images.edit} className="w-4" alt="Time add" /> Edit
            </button>
            <button className="flex gap-1 hover:underline">
              <img src={images.logtime} className="w-4" alt="Time add" /> Log time
            </button>
            <button className="flex gap-1 hover:underline">
              <img src={images.fav} className="w-4" alt="Time add" />
            </button>
            <button className="flex gap-1 hover:underline">
              <img src={images.copy} className="w-4" alt="Time add" /> Copy
            </button>
          </div>
        </div>
        {issue && (
          <div className="bg-[#ffffdd] p-3 border flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex gap-2 flex-wrap">
                <img className="size-16 p-1 border bg-white" src={images.avatar} alt="avatar" />
                <div className="flex flex-col gap-2 text-left">
                  <h3 className="text-base font-bold text-mouse-gray whitespace-normal">{issue?.subject}</h3>
                  <span className="text-xs font-light whitespace-normal">
                    Added by{" "}
                    <a href="" className="link">
                      {issue?.author?.name}
                    </a>{" "}
                    <a href="" className="link">
                      {`${issue?.created_on} `}
                    </a>
                    ago.
                  </span>
                </div>
              </div>
              <div className="text-11 text-gray-500 items-start flex gap-1">
                <button className="text-primary hover:underline hover:text-red-400">« Previous</button>
                <span className="position">| 1 of 166 |</span>
                <button className="text-primary hover:underline hover:text-red-400">Next »</button>
              </div>
            </div>

            <div className="grid grid-cols-4 text-xs font-semibold p-3 text-mouse-gray">
              <div className="grid grid-rows-8 grid-flow-col">
                <label>Status:</label>
                <label>Priority:</label>
                <label>Assignee:</label>
                <label>Category:</label>
                <label>Target version:</label>
                <label>Bug Type:</label>
                <label>Severity:</label>
                <label>QC Activity:</label>
              </div>
              <div className="grid grid-rows-8 grid-flow-col font-normal">
                <span>{issue?.status?.name ? issue?.status?.name : "-"}</span>
                <span>{issue?.priority?.name ? issue?.priority?.name : "-"}</span>
                <a href="" className="text-ocean-blue font-normal">
                  {issue?.assigned_to ? issue?.assigned_to?.name : "-"}
                </a>
                <span>-</span>
                <span>{issue?.fixed_version?.name ? issue?.fixed_version?.name : "-"}</span>
                <span>{issue.custom_fields?.[0]?.value ? issue.custom_fields?.[0]?.value : "-"}</span>
                <span>{issue.custom_fields?.[1]?.value ? issue.custom_fields?.[1]?.value : "-"}</span>
                <span>{issue.custom_fields?.[2]?.value ? issue.custom_fields?.[2]?.value : "-"}</span>
              </div>
              <div className=" grid grid-rows-8 grid-flow-col">
                <label>Start date:</label>
                <label>Due date:</label>
                <label>% Done:</label>
                <label>Estimated time:</label>
                <label>Spent time:</label>
                <label>Cause Category:</label>
                <label>Is Degrade?:</label>
                <label>Reopen counter:</label>
              </div>
              <div className=" grid grid-rows-8 grid-flow-col font-normal">
                <span> {issue.created_on ? formatDate(issue.created_on, true) : "-"}</span>
                <span> {issue.due_date ? issue.due_date : "-"}</span>
                <div className="gap-1 inline-flex align-top w-1/2 min-w-14">
                  <div className="w-[100px] h-5 overflow-hidden bg-slate-200 inline-block align-top">
                    <div className="loading-progress bg-green-300 h-full " style={{ width: `${issue.done_ratio}px` }}></div>
                  </div>
                  <span className="text-10 align-top pl-2">{issue.done_ratio ? issue.done_ratio : 0}%</span>
                </div>
                <span>{issue.estimated_hours ? issue.estimated_hours.toFixed(2) : 0} hours</span>
                <span>{issue?.spent_hours ? `${issue?.spent_hours.toFixed(2)} hours` : "-"}</span>
                <span>{issue.custom_fields?.[3]?.value ? issue.custom_fields?.[3]?.value : "-"}</span>
                <span>{issue.custom_fields?.[4]?.value ? issue.custom_fields?.[4]?.value : "-"}</span>
                <span>{issue.custom_fields?.[5]?.value ? issue.custom_fields?.[5]?.value : "-"}</span>
              </div>
            </div>

            <hr />

            <div className="flex flex-col py-2 text-left gap-3">
              <label htmlFor="" className="text-xs text-zinc-700 font-bold  inline-block">
                Description
              </label>
              <div className="text-xs text-zinc-700"> {issue.description ? issue.description : "description is empty"}</div>
            </div>
            <hr className="my-1" />
            <div className="flex items-center justify-between">
              <label htmlFor="" className="py-2 inline-block text-xs text-zinc-700 font-bold">
                Subtasks
              </label>
              <a href="#!" className="text-primary hover:underline hover:text-red-400 text-11">
                Add
              </a>
            </div>

            <hr className="my-1" />
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <label htmlFor="" className="py-2 inline-block text-xs text-zinc-700  font-bold">
                  Related issues
                </label>
                <button onClick={() => toggleRelatedIssueForm()} className="text-primary hover:underline hover:text-red-400 text-11">
                  Add
                </button>
              </div>
              {showRelatedIssueForm && (
                <form className="flex items-center text-xs gap-1 mt-2">
                  <select className="border border-solid border-[#d7d7d7] p-1 rounded" aria-label="Category">
                    {OPTION_DIALOG.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center gap-1 ">
                    <label className="text-primary-text text-xs">Issue #</label>
                    <div className="relative z-10">
                      <input id="issueInput" className="max-w-24 z-10 pl-5 py-1 border border-[#d7d7d7] p-1" type="text" />
                      <img
                        onClick={handleMagnifierClick}
                        className="absolute z-0 left-[2px] top-1/2 transform -translate-y-1/2 cursor-pointer"
                        src={images.magnifier}
                        alt="manifier"
                      />
                    </div>
                  </div>
                  <button className="bg-primary-sub_bg p-1 border-1 border-solid border-[#cccccc]" type="submit" name="submitAndRedirect">
                    Add
                  </button>
                  <Link to="" onClick={toggleRelatedIssueForm} className="text-[#169] hover:text-[#c61a1] hover:underline">
                    Cancel
                  </Link>
                </form>
              )}
            </div>
          </div>
        )}

        <div className="text-left text-sm px-3 py-1 text-mouse-gray">
          <div className="font-bold pb-1">History</div>
          <div className="pt-1 text-xs">
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <img src={images.avatar} alt="Avatar" className="size-8" />
                <span className="font-bold">
                  Updated by{" "}
                  <a href="" className="link font-bold">
                    Son (internship) Nguyen Hoang Huu
                  </a>{" "}
                  <a href="" className="link font-bold">
                    38 minutes
                  </a>{" "}
                  ago
                </span>
              </div>
              <a className="link font-bold">#1</a>
            </div>

            <ul className="pl-11 text-zinc-700 list-disc">
              <li className="py-3">
                <span className="text-xs font-bold">% Done changed</span> from 10 to 70
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-2 text-10 text-ocean-blue">
          <button className="flex gap-1 hover:underline">
            <img src={images.edit} className="w-4" alt="Time add" /> Edit
          </button>
          <button className="flex gap-1 hover:underline">
            <img src={images.logtime} className="w-4" alt="Time add" /> Log time
          </button>
          <button className="flex gap-1 hover:underline">
            <img src={images.fav} className="w-4" alt="Time add" />
          </button>
          <button className="flex gap-1 hover:underline">{/* <img src={images.copy} className="w-4" alt="Time add" /> Copy */}</button>
        </div>

        <div className="flex items-center gap-1 justify-end text-11 my-2.5">
          <span>Also available in: CSV</span>
          <a className="flex items-center gap-1 text-primary hover:underline hover:text-red-400" href="" rel="noreferrer noopener">
            <img src={images.feed} alt="feed" />
            Atom
          </a>
          <span>|</span>
          <a href="" className="text-primary  text-11 hover:underline hover:text-red-400">
            PDF
          </a>
        </div>
      </div>
      <SubIssues />
    </div>
  );
};

export default IssueDetail;
