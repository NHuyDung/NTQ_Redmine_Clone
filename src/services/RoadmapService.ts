import axiosInstance from "./api";

export const getProjectVersions = async () => {
  try {
    const response = await axiosInstance.get("/projects/323/versions.json");
    return response.data.versions;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getProjectVersionsIssues = async () => {
  try {
    const response = await axiosInstance.get("/issues.json?project_id=323&fixed_version_id=*");
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
