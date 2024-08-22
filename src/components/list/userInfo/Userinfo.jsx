import "./userInfo.css";
import { useUserStore } from "../../../lib/userStore";

const Userinfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="User Avatar" />
        <h2 className="userName">{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="More Options" />
        <img src="./video.png" alt="Video Call" />
        <img src="./edit.png" alt="Edit Profile" />
      </div>
    </div>
  );
};

export default Userinfo;
