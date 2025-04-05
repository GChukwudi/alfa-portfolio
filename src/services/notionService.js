const API_URL = "https://alfa-portfolio-api.onrender.com/api";

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const fetchProjectById = async (pageId) => {
  try {
    const response = await fetch(`${API_URL}/projects/${pageId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch project details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching project details:", error);
    throw error;
  }
};
