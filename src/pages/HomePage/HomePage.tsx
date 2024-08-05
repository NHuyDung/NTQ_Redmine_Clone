import React, { useEffect } from "react";
import images from "~/assets/img";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "~/app/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProject } from "~/features/issues/ProjectSlice ";
import { RingLoader } from "react-spinners";
import { formatDateTime } from "~/utils/FormatDay";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { project, loading: loadingProject } = useSelector((state: RootState) => state.project);
  useEffect(() => {
    if (project?.length === 0) {
      dispatch(fetchProject());
    }
  }, [dispatch, project?.length]);

  const handleNavigate = (identifier: string | undefined, name: string | undefined) => {
    if (identifier && name) {
      navigate(`/projects/${identifier}/overview`, { state: { projectName: name } });
    }
    // navigate(`/projects/${identifier}/overview`, { state: { projectName: name } });
  };

  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-semibold">Home</h2>
      <div className="mt-10 mr-2 border border-gray-300 border-solid min-h-[120px] min-w-[772px]">
        <div className="p-3">
          <div className="flex">
            <img className="pr-1" src={images.homepage} alt="redmine_ntq_solutions"></img>
            <h3 className=" font-medium">Latest projects</h3>
          </div>
          {loadingProject ? (
            <div className="flex justify-center items-center h-24">
              <RingLoader color="#34d2c8" speedMultiplier={2} />
            </div>
          ) : (
            <ul className="pl-10 pt-3 list-disc">
              {project.map((project) => (
                <li className="text-xs" key={project.id}>
                  <button
                    onClick={() => handleNavigate(project?.identifier, project.name)}
                    className="text-[#169] hover:underline hover:text-[#b2290f]"
                  >
                    {project.name}
                  </button>
                  ({formatDateTime(project.created_on)})<br></br>
                  {project.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
