import useUserState from "../../store/userStore";
import "./UserInformation.css";

function UserProfile() {
  const user = useUserState((state) => state.user);

  if (!user) {
    return <div>Loading...</div>;
  }

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0) : "";
    const lastInitial = lastName ? lastName.charAt(0) : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <div className="user-profile">
      <h2>{user.firstName} Profile</h2>
      <div className="user-information">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="profile-picture"
          />
        ) : (
          <div className="avatar">
            {getInitials(user.firstName, user.lastName)}
          </div>
        )}
        <p>
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p>
          <strong>Username:</strong> {user.userName}
        </p>
        <p>
          <strong>Email address:</strong> {user.emailAddress}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
