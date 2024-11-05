import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import UserState from "../../store/userStore";

function Login() {
  const [userNameOrEmailAddress, setUserNameOrEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = UserState((state) => state.setUser);
  const [formError] = useState("");

  const { mutate, isLoading } = useMutation({
    mutationFn: async (userObj) => {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message || "Login failed");
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (user) => {
      setUser(user);
      navigate("/write");
      toast.success("Logged in successfully", {
        theme: "colored",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during login", {
        theme: "colored",
        autoClose: 3000,
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!userNameOrEmailAddress) {
      toast.error("Username or Email Address is required", {
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }

    if (!password) {
      toast.error("Password is required", {
        theme: "colored",
        autoClose: 3000,
      });
      return;
    }

    // Prepare user object to send to the backend
    const userObj = {
      userName: userNameOrEmailAddress.includes("@")
        ? undefined
        : userNameOrEmailAddress,
      emailAddress: userNameOrEmailAddress.includes("@")
        ? userNameOrEmailAddress
        : undefined,
      password,
    };

    mutate(userObj);
  }

  return (
    <div className="signup-section">
      <div className="signup-container">
        <h2>Welcome Back</h2>
        <form onSubmit={handleSubmit} className="signup-details">
          <div className="inputs-details">
            <label htmlFor="userNameOrEmail">Username or Email Address</label>
            <input
              type="text"
              id="userNameOrEmail"
              placeholder="Username or Email"
              required
              value={userNameOrEmailAddress}
              onChange={(e) => setUserNameOrEmailAddress(e.target.value)}
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

          {formError && <p className="error-text">{formError}</p>}

          <div className="button-submit">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading, please wait..." : "Log In"}
            </button>
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
