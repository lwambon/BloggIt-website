//import "./Profile.css";
import PasswordUpdateForm from "../../component/PasswordUpdateForm/PasswordUpdateForm";
import ProfileInformationUpdate from "../../component/ProfileInformationUpdateForm/ProfileInformationUpdateForm";
import UserProfile from "../../component/UserInformation/UserInformation";
import Navbar from "../../component/Navbar/Navbar";

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="profile-container-section">
        <div className="profile-container">
          <UserProfile />
          <ProfileInformationUpdate />
          <PasswordUpdateForm />
        </div>
      </div>
    </div>
  );
}

export default Profile;
