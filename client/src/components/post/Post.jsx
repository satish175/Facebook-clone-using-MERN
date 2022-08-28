import "./post.css";
import { MoreVert, Favorite, ThumbUp } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(
        `http://localhost:8800/api/users?userId=${post.userId}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);
  const likeHandler = () => {
    try {
      Axios.put("http://localhost:8800/api/posts/" + post._id + "/like", {
        user: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="pTLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="pProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noavatar.jpeg"
                }
                alt=""
              />
            </Link>
            <span className="pUsername">{user.username}</span>
            <span className="pDate">{format(post.createdAt)}</span>
          </div>
          <div className="pTRight">
            <MoreVert></MoreVert>
          </div>
        </div>
        <div className="postCenter">
          <span className="pText">{post?.desc}</span>
          <img className="pImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="pBLeft">
            <ThumbUp
              className="likeIcon"
              htmlColor="blue"
              onClick={likeHandler}
            ></ThumbUp>

            <Favorite
              className="likeIcon"
              htmlColor="red"
              onClick={likeHandler}
            ></Favorite>
            <span className="pLikeCounter">{like} likes</span>
          </div>
          <div className="pBRight">
            <span className="pCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
