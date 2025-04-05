import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./CompanyDetail.css";
import { FaArrowLeftLong } from "react-icons/fa6";

const CompanyDetail = () => {
  const { id } = useParams();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://alfa-portfolio-api.onrender.com/api/companies/${id}`,
        );

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        setCompanyData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Failed to load company details. Please try again later.");

        const mockData = {
          company: {
            id,
            title: "Company Name",
          },
          projects: [
            {
              id: "project1",
              title: "Project",
              subtitle: "Lorem ipsum est simplement",
              description:
                "Lorem ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
              image: "/notion-screenshot.png",
            },
            {
              id: "project2",
              title: "Another Project",
              subtitle: "Lorem ipsum est simplement",
              description:
                "Lorem ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
              image: "/notion-screenshot.png",
            },
          ],
        };

        setCompanyData(mockData);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (error && !companyData) {
    return <div className="error">{error}</div>;
  }

  if (!companyData || !companyData.company) {
    return <div className="error">Company not found</div>;
  }

  const { projects } = companyData;

  return (
    <div className="company-detail">
      <div className="company-header">
        <div className="back-button" onClick={() => navigate(-1)}>
          <div className="back-circle">
            <span className="back-arrow">
              <FaArrowLeftLong className="arrow-icon" />
            </span>
          </div>
        </div>
        <div className="menu-button">
          <div className="menu-circle">
            <span className="menu-icon">≡</span>
          </div>
        </div>
      </div>

      <div className="company-projects">
        {projects && projects.length > 0 ? (
          <div className="projects-grids">
            {projects.map((project) => (
              <div className="project-cards" key={project.id}>
                <div className="project-contents">
                  <h3 className="project-titles">{project.title}</h3>
                  <p className="project-subtitles">{project.subtitle}</p>
                  <p className="project-descriptions">{project.description}</p>
                  <Link
                    to={`/project/${project.id}`}
                    className="project-button"
                  >
                    Button <span className="arrow">→</span>
                  </Link>
                </div>
                <div className="project-images">
                  <img src={project.image} alt={project.title} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-projects">No projects found for this company.</div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetail;
