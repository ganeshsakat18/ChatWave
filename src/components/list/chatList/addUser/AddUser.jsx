import "./addUser.css";
import { db } from "../../../../lib/firebase";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username").trim();

    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        setError("No user found with this username.");
      }
    } catch (err) {
      setError("An error occurred while searching for the user.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!user) return;

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      // Clear the user state after adding
      setUser(null);
    } catch (err) {
      console.log(err);
      setError("An error occurred while adding the user.");
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          aria-label="Search Username"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {user && (
        <div className="user">
          <div className="detail">
            <img
              src={user.avatar || "./avatar.png"}
              alt={`${user.username}'s avatar`}
            />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
