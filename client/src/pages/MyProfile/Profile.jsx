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
          <div className="updating-information-section">
            <ProfileInformationUpdate />
            <PasswordUpdateForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
