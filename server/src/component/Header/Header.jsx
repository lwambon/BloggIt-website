import "./Header.css";

function Header() {
  return (
    <div className="header-section">
      <div className="header-content">
        <h2 className="header-logo">blogit</h2>
        <nav className="navigation-items">
          <a href="#" className="nav-lists">
            home
          </a>
          <a href="#" className="nav-lists">
            write
          </a>
          <a href="#" className="nav-lists">
            explore pages
          </a>
          <a href="#" className="nav-lists">
            my blogs
          </a>
          <a href="#" className="nav-lists">
            my profile
          </a>
        </nav>
        <div className="sign-up-buttons">
          <button className="loggin">
            <a href="">sign up</a>
          </button>
          <button className="loggin">
            <a href="">login</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
