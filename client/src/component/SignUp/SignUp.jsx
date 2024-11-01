import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useState } from "react";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const { mutate, isloading } = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch("http://localhost:4000/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      const data = response.json();
      return data;
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      setFormError(error.message || "Something went wrong!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match");
      return;
    }

    mutate({
      firstName,
      lastName,
      userName,
      emailAddress,
      password,
    });
  };

  return (
    <div className="loggin-section">
      <div className="login-container">
        <h2>Create your account here</h2>
        <form onSubmit={handleSubmit} className="login-details">
          <div className="inputs-details">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="inputs-details">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="inputs-details">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          <div className="inputs-details">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="inputs-details">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="inputs-details">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {formError && <p className="error-text">{formError}</p>}

          <div className="login-submit">
            <button type="submit" disabled={isloading}>
              {isloading ? "Loading, please wait..." : "Sign Up"}
            </button>
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
