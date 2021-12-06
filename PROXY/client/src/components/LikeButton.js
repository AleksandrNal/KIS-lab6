import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import "../index";

export const LikeButton = ({ liking, id }) => {
  const { token, userId } = useContext(AuthContext);
  const [liked, setliked] = useState(liking.includes(userId));
  const [likes, setlikes] = useState(liking.length);

  const { loading, request } = useHttp();

  const label = liked ? "Unlike" : "Like";

  const likeHandler = async () => {
    try {
      await request(
        "/api/post/like",
        "POST",
        {
          messageId: id,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      if (liked) {
        setlikes(likes - 1);
      } else {
        setlikes(likes + 1);
      }
      setliked(!liked);
    } catch (e) {}
  };

  return (
    <div>
      <button
        className={"btn-like " + (liked && "btn-unlike")}
        onClick={likeHandler}
        disabled={loading}
      >
        {label + " " + likes}
      </button>
    </div>
  );
};
