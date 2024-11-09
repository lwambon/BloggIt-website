import { FaBloggerB } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useUserState from "../../store/userStore";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useUserState();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <div className="header-content">
        <div className="navigation-content-link">
          <h2 className="header-logo">
            <span>
              <FaBloggerB />
            </span>
            blogit
          </h2>

          <nav className="navigation-items">
            <Link className="nav-lists" to="/">
              Home
            </Link>
            <Link className="nav-lists" to="/write">
              Write Blog
            </Link>
            <Link className="nav-lists" to="/explore">
              Explore Blogs
            </Link>
            <Link className="nav-lists" to="/blogs">
              My Blogs
            </Link>
            <Link className="nav-lists" to="/profile">
              Profile
            </Link>
          </nav>

          <div className="user-section">
            {user && user.firstname ? (
              <>
                <span className="user-greeting">Hello, {user.firstname}</span>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <Link className="nav-lists" to="/login">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
