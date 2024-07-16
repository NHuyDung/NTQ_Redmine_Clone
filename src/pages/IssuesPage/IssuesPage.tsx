import React, { useState } from "react";

const IssuesPage = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handleToggleFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  return (
    <div>
      <h2 className="text-[#555] text-lg text-5 font-semibold pb-2">Issues</h2>
      <form>
        <div>
          <fieldset>
            <legend onClick={handleToggleFilter} className="cursor-pointer pb-2 text-xs">
              {!isOpenFilter ? (
                <img className="inline w-3" src="https://redmine.ntq.solutions/images/arrow_collapsed.png"></img>
              ) : (
                <img className="inline w-3" src="https://redmine.ntq.solutions/images/arrow_expanded.png"></img>
              )}
              Filters
            </legend>
            {!isOpenFilter ? null : (
              <div className="flex justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="cb_status_id"></input>
                  <label htmlFor="cb_status_id" className="pl-1 text-xs">
                    Status
                  </label>
                </div>

                <select id="operators_status_id" className="border border-primary-border w-16 h-6 text-xs">
                  <option className="text-xs" value="">
                    All
                  </option>
                  <option className="text-xs" value="open">
                    Open
                  </option>
                  <option className="text-xs" value="resolved">
                    Resolved
                  </option>
                  <option className="text-xs" value="closed">
                    Closed
                  </option>
                </select>

                <span>
                  <select id="values_status_id" className="border border-primary-border w-56 h-6 text-xs">
                    <option className="text-xs" value="">
                      All
                    </option>
                    <option className="text-xs" value="created_by">
                      Created by
                    </option>
                    <option className="text-xs" value="assigned_to">
                      Assigned to
                    </option>
                    <option className="text-xs" value="updated_by">
                      Updated by
                    </option>
                  </select>
                </span>

                <div>
                  <label htmlFor="add_filter_select" className="pr-1">
                    Add filter
                  </label>
                  <select id="add_filter_select" className="border border-primary-border w-32 h-6 text-xs">
                    <option className="text-xs" value="">
                      All
                    </option>
                    <option className="text-xs" value="created_on">
                      Created on
                    </option>
                    <option className="text-xs" value="updated_on">
                      Updated on
                    </option>
                    <option className="text-xs" value="due_date">
                      Due date
                    </option>
                  </select>
                </div>
              </div>
            )}
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default IssuesPage;
