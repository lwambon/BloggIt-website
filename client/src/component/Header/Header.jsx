import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header-section">
      <div className="header-content">
        <h2 className="header-logo">blogit</h2>
        <nav className="navigation-items">
          <Link className="nav-lists" to="/">
            Home
          </Link>
          <Link className="nav-lists" to="/write">
            write blog
          </Link>
          <Link className="nav-lists" to="/explore">
            Explore blogs
          </Link>
          <Link className="nav-lists" to="/blogs">
            My blogs
          </Link>
          <Link className="nav-lists" to="/profile">
            My profile
          </Link>
        </nav>
        <div className="sign-up-buttons">
          <Link to="/signup">
            <button className="loggin">sign up</button>
          </Link>
          <Link to="/login">
            <button className="loggin">login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
