import "./Profile.css";
import PersonalBlogsPreview from "../../component/PersonalBlogsPreview/PersonalBlogsPreview";
import PasswordUpdateForm from "../../component/PasswordUpdateForm/PasswordUpdateForm";
import ProfileInformationUpdate from "../../component/ProfileInformationUpdateForm/ProfileInformationUpdateForm";
import Navbar from "../../component/Navbar/Navbar";

function Profile() {
  return (
    <div>
      <Navbar />
      <div className="profile-container-section">
        <PersonalBlogsPreview />
        <div className="profile-container">
          <ProfileInformationUpdate />
          <PasswordUpdateForm />
        </div>
      </div>
    </div>
  );
}

export default Profile;
