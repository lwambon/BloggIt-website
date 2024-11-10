import React from "react";
import { FaBloggerB } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useUserState from "../../store/userStore";
import "./Navbar.css";

function Header() {
  const { user, logout } = useUserState();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="header-content">
      <div className="navigation-content-link">
        <h2 className="header-logo">
          <span>
            <FaBloggerB />
          </span>
          blogIt
        </h2>

        <nav className="navigation-items">
          <Link className="nav-lists" to="/">
            Home
          </Link>
          {user ? (
            <>
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
              <p className="nav-lists">Hello, {user.firstName}</p>
            </>
          ) : (
            <>
              <Link className="nav-lists" to="/login">
                Login
              </Link>
              <Link className="nav-lists" to="/sign-up">
                Sign Up
              </Link>
            </>
          )}
        </nav>

        <div className="user-section">
          {user ? (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Header;
