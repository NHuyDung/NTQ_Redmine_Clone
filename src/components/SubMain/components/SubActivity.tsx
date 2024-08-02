// src/components/SubActivity.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { setFilters, FilterState } from "~/features/issues/filterSlice";

const SubActivity: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter as FilterState);

  // Local state to manage checkbox values
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Update Redux store with local state when "Apply" is clicked
    dispatch(setFilters(localFilters));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-[#666] text-sm mt-3.5 mb-2.5">Activity</h3>
      <ul className="text-xs">
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_issues" name="showIssues" checked={localFilters.showIssues} onChange={handleChange} />
          <label htmlFor="show_issues">
            <a href="#">Issues</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_changesets" name="showChangesets" checked={localFilters.showChangesets} onChange={handleChange} />
          <label htmlFor="show_changesets">
            <a href="#">Changesets</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_documents" name="showDocuments" checked={localFilters.showDocuments} onChange={handleChange} />
          <label htmlFor="show_documents">
            <a href="#">Documents</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_files" name="showFiles" checked={localFilters.showFiles} onChange={handleChange} />
          <label htmlFor="show_files">
            <a href="#">Files</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_wiki_edits" name="showWikiEdits" checked={localFilters.showWikiEdits} onChange={handleChange} />
          <label htmlFor="show_wiki_edits">
            <a href="#">Wiki edits</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_time_entries" name="showTimeEntries" checked={localFilters.showTimeEntries} onChange={handleChange} />
          <label htmlFor="show_time_entries">
            <a href="#">Spent time</a>
          </label>
        </li>
      </ul>
      <input className="text-xs text-[#222222] bg-[#f2f2f2] border border-[#cccccc] py-0.5 px-1.5 my-3" type="submit" value="Apply" />
    </form>
  );
};

export default SubActivity;
