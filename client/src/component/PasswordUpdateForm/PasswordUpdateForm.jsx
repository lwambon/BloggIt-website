import { useState } from "react";
import { useMutation } from "react-query";
import useUserState from "../../store/userStore";
import apiBase from "../../utils/apiBase";
import "./PasswordUpdateForm.css";

function PasswordUpdateForm() {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const user = useUserState((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: async (passwords) => {
      const response = await fetch(`${apiBase}/auth/password`, {
        // fixed template literal
        method: "PATCH",
        body: JSON.stringify(passwords),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },

    onSuccess: () => {
      setMessage("Your password has been successfully updated!");
      setMessageType("success");
      setPrevPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },

    onError: (err) => {
      setMessage(`Error: ${err.message}`); // fixed template literal
      setMessageType("error");
    },
  });

  function handlePasswordUpdate(e) {
    e.preventDefault();
    setMessage("");

    if (!prevPassword) {
      setMessage("Previous password is required.");
      setMessageType("error");
      return;
    }
    if (!newPassword) {
      setMessage("New password is required.");
      setMessageType("error");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
      setMessageType("error");
      return;
    }

    mutate({
      userId: user.id,
      prevPassword,
      newPassword,
    });
  }

  return (
    <div className="password-update-form">
      <h2 className="form-title">Update Password</h2>

      {message && (
        <div
          className={`message ${messageType === "success" ? "success" : "error"}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handlePasswordUpdate} className="form">
        <div className="form-group">
          <label htmlFor="previous-password" className="form-label">
            Previous Password:
          </label>
          <input
            type="password"
            id="previous-password"
            className="form-input"
            value={prevPassword} // fixed variable name
            onChange={(e) => setPrevPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="new-password" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            id="new-password"
            className="form-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            className="form-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default PasswordUpdateForm;
