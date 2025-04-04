import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Profile from "../assets/profile.png";

const Header = () => {
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();

  const handleProfileClick = () => {
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 200);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="profile-container">
          <img
            src={Profile}
            alt="Profile"
            className="profile-image"
            onClick={handleProfileClick}
          />
          {showMessage && <div className="popup-message">What's up!</div>}
        </div>

        <nav className="navigation">
          <div className="nav-tabs">
            <Link
              to="/work"
              className={`nav-tab ${
                location.pathname === "/work" ? "active" : ""
              }`}
            >
              Work
            </Link>
            <Link
              to="/about"
              className={`nav-tab ${
                location.pathname === "/about" ? "active" : ""
              }`}
            >
              About
            </Link>
          </div>
        </nav>

        <button className="menu-button">
          <span className="menu-icon">≡</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
