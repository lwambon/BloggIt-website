import { useState } from "react";
import "./ProfileInformation.css";

function ProfileInformation() {
  const [profilePicture, setProfilePicture] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [emailAddress, setEmailAddress] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const profile = {
      profilePicture,
      firstName,
      lastName,
      userName,
      emailAddress,
    };
  }
  return (
    <div className="profile-section">
      <div className="profile-container">
        <h2 className="title-personal-information">personal information</h2>
        <form action="" className="personal-information-details">
          <div className="input-section">
            <label htmlFor="profilePicture">profilePicture</label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />
          </div>

          <div className="input-section">
            <label htmlFor="firstName">firstName</label>
            <input
              type="text"
              id="firstName"
              className="input-details"
              name="firstName"
              placeholder="firstName"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-section">
            <label htmlFor="lastName">lastName</label>
            <input
              type="text"
              id="lastName"
              className="input-details"
              name="lastName"
              placeholder="lastName"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="input-section">
            <label htmlFor="user name">User Name</label>
            <input
              type="text"
              id="User Name"
              className="input-details"
              name="User Name"
              placeholder="User Name"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="input-section">
            <label htmlFor="email address">emailAddress</label>
            <input
              type="text"
              id="emailAddress"
              className="input-details"
              name="emailAddress"
              placeholder="emailAddress"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileInformation;
