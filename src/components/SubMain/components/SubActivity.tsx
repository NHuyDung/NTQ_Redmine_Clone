import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/app/store";
import { setFilters, FilterState } from "~/features/issues/filterSlice";

const SubActivity: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter as FilterState);

  // Local state to manage checkbox values
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    // Save filters to localStorage when filters change
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleLabelClick = (name: string) => {
    const updatedFilters = {
      ...localFilters,
      showIssues: false,
      showChangesets: false,
      showDocuments: false,
      showFiles: false,
      showWikiEdits: false,
      showTimeEntries: false,
      [name]: true,
    };
    setLocalFilters(updatedFilters);
    dispatch(setFilters(updatedFilters));
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
          <input type="checkbox" id="show_issues" name="showIssues" checked={localFilters.showIssues} onChange={handleCheckboxChange} />
          <label htmlFor="show_issues" onClick={() => handleLabelClick("showIssues")}>
            <a href="#">Issues</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_changesets" name="showChangesets" checked={localFilters.showChangesets} onChange={handleCheckboxChange} />
          <label htmlFor="show_changesets" onClick={() => handleLabelClick("showChangesets")}>
            <a href="#">Changesets</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_documents" name="showDocuments" checked={localFilters.showDocuments} onChange={handleCheckboxChange} />
          <label htmlFor="show_documents" onClick={() => handleLabelClick("showDocuments")}>
            <a href="#">Documents</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_files" name="showFiles" checked={localFilters.showFiles} onChange={handleCheckboxChange} />
          <label htmlFor="show_files" onClick={() => handleLabelClick("showFiles")}>
            <a href="#">Files</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input type="checkbox" id="show_wiki_edits" name="showWikiEdits" checked={localFilters.showWikiEdits} onChange={handleCheckboxChange} />
          <label htmlFor="show_wiki_edits" onClick={() => handleLabelClick("showWikiEdits")}>
            <a href="#">Wiki edits</a>
          </label>
        </li>
        <li className="flex item-center gap-1.5 text-[#169] cursor-pointer hover:underline hover:text-[#b2290f]">
          <input
            type="checkbox"
            id="show_time_entries"
            name="showTimeEntries"
            checked={localFilters.showTimeEntries}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="show_time_entries" onClick={() => handleLabelClick("showTimeEntries")}>
            <a href="#">Spent time</a>
          </label>
        </li>
      </ul>
      <input
        className="hover:bg-[#ccccbb] text-xs text-[#222222] bg-[#f2f2f2] border border-[#cccccc] py-0.5 px-1.5 my-3"
        type="submit"
        value="Apply"
      />
    </form>
  );
};

export default SubActivity;
