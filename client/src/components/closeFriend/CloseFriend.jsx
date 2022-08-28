import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <li className="sFriend">
        <img src={PF + user.profilePicture} alt="" className="sFriendImg" />
        <span className="sFriendName">{user.username}</span>
      </li>
    </div>
  );
}
