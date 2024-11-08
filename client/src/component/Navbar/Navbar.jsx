//import React, { useContext } from "react";
import { FaBloggerB } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
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
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
