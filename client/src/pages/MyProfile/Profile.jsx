import "./Profile.css";
import PersonalBlogsPreview from "../../component/PersonalBlogsPreview/PersonalBlogsPreview";
import ProfileUpdate from "../../component/ProfileUpdate/ProfileUpdate";
import PasswordUpdateForm from "../../component/PasswordUpdateForm/PasswordUpdateForm";
import ProfileInformation from "../../component/ProfileInformation/ProfileInformation";

function Profile() {
  return (
    <div>
      <PersonalBlogsPreview />
      <ProfileInformation />
      <ProfileUpdate />
      <PasswordUpdateForm />
    </div>
  );
}

export default Profile;
