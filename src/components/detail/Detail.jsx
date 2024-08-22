import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css";

const Detail = () => {
  const {
    chatId,
    user,
    isCurrentUserBlocked,
    isReceiverBlocked,
    changeBlock,
    resetChat,
  } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.error("Error updating document: ", err);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      resetChat();
    } catch (err) {
      console.error("Error signing out: ", err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="User Avatar" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="Expand" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="Expand" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="Expand" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="Collapse" />
          </div>
          <div className="photos">
            {["photo_1", "photo_2", "photo_3", "photo_4"].map(
              (photo, index) => (
                <div key={index} className="photoItem">
                  <div className="photoDetail">
                    <img
                      src={`https://images.pexels.com/photos/7381200/pexels-photo-7381200.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load`}
                      alt={`Shared photo ${index + 1}`}
                    />
                    <span>{`photo_2024_${index + 1}.png`}</span>
                  </div>
                  <img src="./download.png" alt="Download" className="icon" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="Expand" />
          </div>
        </div>
        <button
          onClick={handleBlock}
          aria-label={isCurrentUserBlocked ? "Unblock User" : "Block User"}
        >
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User Blocked"
            : "Block User"}
        </button>
        <button className="logout" onClick={handleLogout} aria-label="Logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Detail;
