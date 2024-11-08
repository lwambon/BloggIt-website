import "./Header.css";
import { FaBloggerB } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-section">
      <div className="header-main-content">
        <h2 className="header-logo">
          <span>
            <FaBloggerB />
          </span>
          blogit
        </h2>
        <div className="sign-up-buttons">
          <Link to="/signup">
            <button className="loggin">sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
