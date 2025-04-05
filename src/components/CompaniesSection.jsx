import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CompaniesSection.css";

const CompaniesSection = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/companies");

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        setCompanies(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies. Please try again later.");

        // Fallback to mock data for development
        const mockCompanies = [
          {
            id: "company1",
            title: "Company",
            subtitle: "Lorem ipsum est simplement",
            description:
              "Lorem ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
            image: "/notion-screenshot.png",
          },
          {
            id: "company2",
            title: "Lorem Ipsum",
            subtitle: "Lorem ipsum est simplement",
            description:
              "Lorem ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression.",
            image: "/notion-screenshot.png",
          },
        ];

        setCompanies(mockCompanies);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div className="section-loading">Loading companies...</div>;
  }

  if (error && companies.length === 0) {
    return <div className="section-error">{error}</div>;
  }

  if (companies.length === 0) {
    return <div className="section-empty">No companies found.</div>;
  }

  return (
    <div className="companies-section">
      {/* <div className="companies-grid"> */}
        {companies.map((company) => (
          <div className="company-card" key={company.id}>
            <div className="company-content">
              <h3 className="company-title">{company.title}</h3>
              <p className="company-subtitle">{company.subtitle}</p>
              <p className="company-description">{company.description}</p>
              <Link to={`/company/${company.id}`} className="company-button">
                Button <span className="arrow">→</span>
              </Link>
            </div>
            <div className="company-image">
              <img src={company.image} alt={company.title} />
            </div>
          </div>
        ))}
      {/* </div> */}
    </div>
  );
};

export default CompaniesSection;
