import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProjectDetail.css";
import { FaFigma } from "react-icons/fa";
import { fetchProjectById } from "../services/notionService";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProjectDetails = async () => {
      try {
        setLoading(true);
        const projectData = await fetchProjectById(id);
        setProject(projectData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to load project details. Please try again later.");
        setLoading(false);
      }
    };

    getProjectDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!project) {
    return <div className="error">Project not found</div>;
  }

  return (
    <div className="project-detail">
      <div className="project-header">
        <Link to="/work" className="back-button">
          <div className="back-circle">
            <span className="back-arrow">←</span>
          </div>
        </Link>
        <div className="menu-button">
          <div className="menu-circle">
            <span className="menu-icon">≡</span>
          </div>
        </div>
      </div>

      <div className="job-card">
        <img
          src={project.image || "/project.png"}
          alt="Project Preview"
          className="job-card-image"
        />
      </div>

      <div className="project-content">
        <div className="project-branding">
          <div className="project-logo">
            {project.logo ? (
              <img src={project.logo} alt={`${project.title} logo`} />
            ) : (
              <FaFigma className="figma-icon" />
            )}
          </div>
          <div className="project-title-section">
            <h1>{project.title}</h1>
            <p>{project.subtitle}</p>
          </div>
        </div>

        <div className="project-main-section">
          <div className="project-description">
            <p>{project.description}</p>
          </div>

          <div className="project-details">
            <div className="project-column">
              <div className="detail-section">
                <h3>Role</h3>
                {project.role.map((item, index) => (
                  <p key={`role-${index}`}>{item}</p>
                ))}
              </div>

              <div className="detail-section">
                <h3>Responsibility</h3>
                {project.responsibility.map((item, index) => (
                  <p key={`resp-${index}`}>{item}</p>
                ))}
              </div>
            </div>

            <div className="project-column">
              <div className="detail-section">
                <h3>Team</h3>
                {project.team.map((item, index) => (
                  <p key={`team-${index}`}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="problem-section">
          <h3>Problem</h3>
          <div className="problem-content">
            {project.problem.split("\n\n").map((paragraph, index) => (
              <p key={`problem-p-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
