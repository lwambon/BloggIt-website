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

  // Cloudinary upload function
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    const present_key = "gevuuttq";
    const cloud_name = "ddvzeq4od";
    formData.append("file", file);
    formData.append("upload_preset", present_key);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    return data.secure_url;
  };

  const { mutate, isLoading } = useMutation(
    async (updatedUserObj) => {
      let imageUrl = updatedUserObj.profilePicture;
      if (updatedUserObj.profilePicture) {
        imageUrl = await uploadToCloudinary(updatedUserObj.profilePicture);
      }

      const response = await fetch(`${apiBase}/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedUserObj, profilePicture: imageUrl }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = (await response.json()).message || "An error occurred";
        throw new Error(error);
      }

      return response.json();
    },
    {
      onSuccess: (data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data)); // Save user data to local storage
        toast.success("Profile information updated successfully", {
          theme: "colored",
          duration: 3000,
        });
      },
      onError: (error) => {
        toast.error(error.message, { theme: "colored", duration: 3000 });
      },
    },
  );

  // Load user data from local storage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setProfilePicture(storedUser.profilePicture || null);
      setFirstName(storedUser.firstName || "");
      setLastName(storedUser.lastName || "");
      setUserName(storedUser.userName || "");
      setEmailAddress(storedUser.emailAddress || "");
    } else if (user) {
      // If no data in local storage, fallback to state
      setProfilePicture(user.profilePicture || null);
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setUserName(user.userName || "");
      setEmailAddress(user.emailAddress || "");
    }
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
