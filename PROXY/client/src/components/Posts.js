import React, { useContext, useState } from "react";
import { Post } from "../components/Post";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const Posts = ({ posts }) => {
  const { request } = useHttp();
  const { token, userId } = useContext(AuthContext);
  const [seen, setseen] = useState(async () => {
    try {
      const fetched = await request("/api/post/getLastSeen", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setseen(fetched);
      console.log(fetched);
    } catch (e) {}
  });

  async function setLastSeen(post) {
    try {
      await request(
        "/api/post/updateLastSeen",
        "POST",
        {
          userId,
          messageId: post._id,
        },
        {
          Authorization: `Bearer ${token}`,
        },
        false
      );
    } catch (e) {}
  }

  if (!posts.length) {
    return <p className="center">There is no posts</p>;
  }
  const result = (
    <div className="row" style={{ marginTop: 20 }}>
      <div className="col s12 yellow darken-2">
        {posts
          .slice(0)
          .reverse()
          .map((post) => {
            if (new Date(post.date).getTime() > new Date(seen).getTime()) {
              if (post._id === posts[posts.length - 1]._id) {
                setLastSeen(posts[posts.length - 1]);
              }
              return <Post post={post} key={post._id} isnew={true} />;
            } else {
              return <Post post={post} key={post._id} isnew={false} />;
            }
          })}
      </div>
    </div>
  );

  return result;
};
