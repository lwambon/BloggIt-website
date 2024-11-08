import "./Profile.css";
import PersonalBlogsPreview from "../../component/PersonalBlogsPreview/PersonalBlogsPreview";
import PasswordUpdateForm from "../../component/PasswordUpdateForm/PasswordUpdateForm";
import ProfileInformationUpdate from "../../component/ProfileInformationUpdateForm/ProfileInformationUpdateForm";

function Profile() {
  return (
    <div className="profile-container-section">
      <PersonalBlogsPreview />
      <div className="profile-container">
        <ProfileInformationUpdate />
        <PasswordUpdateForm />
      </div>
    </div>
  );
}

export default Profile;
