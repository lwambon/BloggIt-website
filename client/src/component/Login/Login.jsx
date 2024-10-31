import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="signup-section">
      <div className="signup-container">
        <h2>Welcome Back</h2>
        <form action="" className="signup-details">
          <div className="inputs-details">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" required />
          </div>

          <div className="inputs-details">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="button-submit">
            <button>Submit</button>
          </div>
          <p className="signup-text">
            Don’t have an account?{" "}
            <span>
              <Link to="/signup">Create one here</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
