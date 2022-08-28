import "./Topbar.css";
import { Comment, Notifications, Person, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <span>MySoCiaL</span>
        </Link>
      </div>
      <div className="topsearch">
        <div className="searchIcon">
          <Search></Search>
        </div>
        <input placeholder="Search" className="searchbar" />
      </div>
      <div className="topright">
        <div className="toplinks">
          <span>Homepage</span>
          <span className="timeline">Timeline</span>
        </div>
        <div className="rightIcons">
          <div className="iconItem">
            <Person></Person>
            <span className="iconbadge">1</span>
          </div>
          <div className="iconItem">
            <Comment />
            <span className="iconbadge">1</span>
          </div>
          <div className="iconItem">
            <Notifications></Notifications>
            <span className="iconbadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noavatar.jpeg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
