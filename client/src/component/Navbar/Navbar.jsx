import { FaBloggerB } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUserState from "../../store/userStore";
import "./Navbar.css";

function Navbar() {
  const { user } = useUserState();

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
              Blogs
            </Link>
            <Link className="nav-lists" to="/profile">
              My Profile
            </Link>

            {user && user.firstname && (
              <Link className="nav-lists" to="/user">
                Hello {user.firstname}
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
