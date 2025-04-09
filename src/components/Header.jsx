import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Profile from "../assets/profile.png";

const Header = () => {
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();
  const indicatorRef = useRef(null);
  const tabsRef = useRef(null);

  useEffect(() => {
    if (indicatorRef.current && tabsRef.current) {
      const activeTab = tabsRef.current.querySelector(".active");
      if (activeTab) {
        const tabRect = activeTab.getBoundingClientRect();

        indicatorRef.current.style.left = `${activeTab.offsetLeft}px`;
        indicatorRef.current.style.width = `${tabRect.width}px`;
      }
    }
  }, [location.pathname]);

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
          <div className="nav-tabs" ref={tabsRef}>
            <div className="nav-indicator" ref={indicatorRef}></div>

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
