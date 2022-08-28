import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import GroupsIcon from "@mui/icons-material/Groups";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <ul className="sList">
          <li className="sListItem">
            <RssFeedIcon className="sLIcon"></RssFeedIcon>
            <span className="sLIFeed">Feed</span>
          </li>

          <li className="sListItem">
            <ChatIcon className="sLIcon"></ChatIcon>
            <span className="sLIFeed">Chats </span>
          </li>
          <li className="sListItem">
            <OndemandVideoIcon className="sLIcon"></OndemandVideoIcon>
            <span className="sLIFeed">Videos</span>
          </li>
          <li className="sListItem">
            <GroupsIcon className="sLIcon"></GroupsIcon>
            <span className="sLIFeed">Groups</span>
          </li>
          <li className="sListItem">
            <BookmarksIcon className="sLIcon"></BookmarksIcon>
            <span className="sLIFeed">Bookmarks</span>
          </li>
          <li className="sListItem">
            <HelpOutlineRoundedIcon className="sLIcon"></HelpOutlineRoundedIcon>
            <span className="sLIFeed">Videos</span>
          </li>
          <li className="sListItem">
            <WorkOutlineRoundedIcon className="sLIcon"></WorkOutlineRoundedIcon>
            <span className="sLIFeed">Feed</span>
          </li>
          <li className="sListItem">
            <EventRoundedIcon className="sLIcon"></EventRoundedIcon>
            <span className="sLIFeed">Events</span>
          </li>
          <li className="sListItem">
            <SchoolRoundedIcon className="sLIcon"></SchoolRoundedIcon>
            <span className="sLIFeed">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
