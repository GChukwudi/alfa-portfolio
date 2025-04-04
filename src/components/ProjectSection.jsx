import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProjectSection.css";
import { fetchProjects } from "../services/notionService";

const ProjectSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  if (loading) {
    return <div className="project-section-loading">Loading projects...</div>;
  }

  if (error) {
    return <div className="project-section-error">{error}</div>;
  }

  return (
    <div className="project-section">
      {projects.map((project) => (
        <div className="project-card" key={project.id}>
          <div className="project-content">
            <h2 className="project-title">{project.title}</h2>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-description">{project.description}</p>
            <Link to={`/project/${project.id}`} className="project-button">
              Button <span className="arrow">→</span>
            </Link>
          </div>
          <div className="project-image">
            <img src={project.image} alt={project.title} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSection;
