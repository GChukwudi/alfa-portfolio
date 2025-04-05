import "./Footer.css";
import { FiFigma, FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="social-icons">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FiLinkedin className="icon"/>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FiTwitter className="icon"/>
        </a>
        <a
          href="https://figma.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FiFigma className="icon"/>
        </a>
      </div>
      <div className="copyright">
        <p>Copyright © {currentYear} Alfa Zhial. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
