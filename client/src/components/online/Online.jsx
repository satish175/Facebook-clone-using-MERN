import "./online.css";

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rFriend">
      <div className="rProfileImgContainer">
        <img src={PF + user.profilePicture} alt="" className="rProfileImg" />
        <span className="rOnline"></span>
      </div>
      <span className="rUsername">{user.username}</span>
    </li>
  );
}
