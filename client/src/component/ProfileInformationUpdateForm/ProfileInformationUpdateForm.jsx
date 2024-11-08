import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import apiBase from "../../utils/apiBase";
import useUserState from "../../store/userStore";
import "./ProfileInformationUpdateForm.css";

function ProfileInformation() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const setUser = useUserState((state) => state.setUser);
  const user = useUserState((state) => state.user);

  const { mutate, isLoading } = useMutation(
    async (updatedUserObj) => {
      const formData = new FormData();
      formData.append("firstName", updatedUserObj.firstName);
      formData.append("lastName", updatedUserObj.lastName);
      formData.append("userName", updatedUserObj.userName);
      formData.append("emailAddress", updatedUserObj.emailAddress);
      if (updatedUserObj.profilePicture) {
        formData.append("profilePicture", updatedUserObj.profilePicture);
      }

      // Log the API base URL to debug
      //console.log("apiBase:", apiBase); // This should not be undefined

      const response = await fetch(`${apiBase}/users`, {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        let error = "An error occurred";
        try {
          const errorResponse = await response.json();
          error = errorResponse.message || error;
        } catch (err) {
          console.error("Failed to parse error response", err);
        }
        throw new Error(error);
      }

      try {
        return await response.json();
      } catch (err) {
        console.warn("No JSON response, assuming empty success response.");
        return {}; // Return an empty object if no JSON is present
      }
    },
    {
      onSuccess: (data) => {
        setUser(data);
        toast.success("Profile information updated successfully", {
          theme: "colored",
          duration: 3000,
        });
      },
      onError: (error) => {
        console.error("Mutation error:", error.message);
        toast.error(error.message, {
          theme: "colored",
          duration: 3000,
        });
      },
    },
  );

  useEffect(() => {
    if (!user) return;
    setProfilePicture(user.profilePicture);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUserName(user.userName);
    setEmailAddress(user.emailAddress);
  }, [user]);

  function handleUpdateProfileInformation(e) {
    e.preventDefault();
    if (!firstName || !lastName || !userName || !emailAddress) {
      return toast.error("All fields are required", {
        theme: "colored",
        duration: 3000,
      });
    }

    mutate({ profilePicture, firstName, lastName, userName, emailAddress });
  }

  return (
    <div className="profile-section">
      <div className="profile-container">
        <h2 className="title-personal-information">Personal Information</h2>
        <form
          onSubmit={handleUpdateProfileInformation}
          className="personal-information-details"
        >
          <div className="input-section">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>

          <div className="input-section">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              className="input-details"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-section">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="input-details"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="input-section">
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              id="userName"
              className="input-details"
              placeholder="User Name"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="input-section">
            <label htmlFor="emailAddress">Email Address</label>
            <input
              type="email"
              id="emailAddress"
              className="input-details"
              placeholder="Email Address"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? "Loading please wait..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileInformation;
