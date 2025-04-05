import { useState, useEffect } from "react";
import "./ApproachExperience.css";
import { FaFigma } from "react-icons/fa";

const ApproachExperience = () => {
  const [approachItems, setApproachItems] = useState([]);
  const [experienceItems, setExperienceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/about-content");

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        setApproachItems(data.approach);
        setExperienceItems(data.experience);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching about content:", err);

        const mockData = {
          approach: [
            {
              id: "1",
              title: "Problem",
              description:
                "I'll explore your real challenges in the form of user stories which clearly communicate the problem.",
            },
            {
              id: "2",
              title: "Problem",
              description:
                "I'll explore your real challenges in the form of user stories which clearly communicate the problem.",
            },
            {
              id: "3",
              title: "Problem",
              description:
                "I'll explore your real challenges in the form of user stories which clearly communicate the problem.",
            },
            {
              id: "4",
              title: "Problem",
              description:
                "I'll explore your real challenges in the form of user stories which clearly communicate the problem.",
            },
          ],
          experience: [
            {
              id: "1",
              title: "Problem",
              company: "Company 1",
              logo: <FaFigma />,
            },
            {
              id: "2",
              title: "Problem",
              company: "Company 2",
              logo: <FaFigma />,
            },
            {
              id: "3",
              title: "Problem",
              company: "Company 3",
              logo: <FaFigma />,
            },
            {
              id: "4",
              title: "Problem",
              company: "Company 4",
              logo: <FaFigma />,
            },
            {
              id: "5",
              title: "Problem",
              company: "Company 5",
              logo: <FaFigma />,
            },
            {
              id: "6",
              title: "Problem",
              company: "Company 6",
              logo: <FaFigma />,
            },
            {
              id: "7",
              title: "Problem",
              company: "Company 7",
              logo: <FaFigma />,
            },
            {
              id: "8",
              title: "Problem",
              company: "Company 8",
              logo: <FaFigma />,
            },
          ],
        };

        setApproachItems(mockData.approach);
        setExperienceItems(mockData.experience);
        setError("Using mock data. Backend connection failed.");
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return <div className="loading">Loading approach and experience...</div>;
  }

  return (
    <div className="approach-experience">
      {error && <div className="error-banner">{error}</div>}

      <div className="approach-section">
        <h2 className="section-title">My approach</h2>
        <div className="approach-grid">
          {approachItems.map((item) => (
            <div className="approach-card" key={item.id}>
              <h3 className="approach-card-title">{item.title}</h3>
              <p className="approach-card-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="experience-section">
        <h2 className="section-title">Experience</h2>
        <div className="experience-grid">
          {experienceItems.map((item) => (
            <div className="experience-card" key={item.id}>
              <div className="experience-card-icon">
                {item.logo ? (
                  <img
                    src={item.logo}
                    alt={`${item.company} logo`}
                    className="company-logo"
                  />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                  </svg>
                )}
              </div>
              <div className="experience-card-content">
                <h3 className="experience-card-title">{item.title}</h3>
                {item.duration && (
                  <p className="experience-card-duration">{item.duration}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApproachExperience;
