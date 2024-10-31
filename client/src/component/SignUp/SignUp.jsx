import "./SignUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="loggin-section">
      <div className="login-container">
        <h2>Create your account here</h2>
        <form action="" className="login-details">
          <div className="inputs-details">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              required
            />
          </div>

          <div className="inputs-details">
            <label htmlFor="lastname">Last Name</label>
            <input type="text" id="lastName" placeholder="Last Name" required />
          </div>

          <div className="inputs-details">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" required />
          </div>

          <div className="inputs-details">
            <label htmlFor="userName">Username</label>
            <input type="text" id="userName" placeholder="Username" required />
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

          <div className="inputs-details">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="login-submit">
            <button>Sign Up</button>
          </div>
          <p className="login-text">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
