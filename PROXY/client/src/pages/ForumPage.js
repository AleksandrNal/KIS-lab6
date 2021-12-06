import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../components/Loader";
import { Posts } from "../components/Posts";
import { Users } from "../components/UserHandlers";
import { useMessage } from "../hooks/message.hook";

export const ForumPage = () => {
  const message = useMessage();
  const [posts, setPosts] = useState([]);
  const [users, setusers] = useState([]);
  const { loading, error, request, clearError } = useHttp();
  const [toPost, settoPost] = useState("");

  const { token, userId, status } = useContext(AuthContext);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const setLastSeen = async (id) => {
    try {
      const data = await request(
        "/api/post/updateLastSeen",
        "POST",
        {
          userId,
          messageId: id,
        },
        {
          Authorization: `Bearer ${token}`,
        },
        false
      );
      message(data.message);
    } catch (e) {}
  };

  const fetchPosts = useCallback(async () => {
    try {
      const fetched = await request("/api/post/getPosts", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setPosts(fetched);
    } catch (e) {}
  }, [token, request]);

  const fetchNewPosts = useCallback(async () => {
    if (loading) {
      return;
    }
    try {
      const fetched = await request(
        "/api/post/getPosts",
        "GET",
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        false
      );

      setPosts(fetched);
    } catch (e) {}
  }, [loading, token, request]);

  useEffect(() => {
    fetchPosts();
    var run = setInterval(() => fetchNewPosts(), 5000);
  }, [fetchPosts]);

  const fetchUsers = useCallback(async () => {
    try {
      if (!(status === "admin")) {
        return;
      }
      const fetched = await request("/api/admin/getUsers", "GET", null, {
        Authorization: `Bearer ${token}`,
      });

      setusers(fetched);
    } catch (e) {}
  }, [status, token, request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const postHandler = async () => {
    try {
      const data = await request(
        "/api/post/post",
        "POST",
        {
          userId,
          content: toPost,
        },
        {
          Authorization: `Bearer ${token}`,
        },
        false
      );
      message(data.message);
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {(!(status === "blocked") && (
        <div className="row">
          <div className="input-field">
            <input
              className="col s9"
              value={toPost}
              onChange={(e) => {
                settoPost(e.target.value);
              }}
            ></input>
          </div>

          <a
            class="col s3 waves-effect waves-light btn"
            disabled={loading}
            onClick={postHandler}
          >
            post
          </a>
        </div>
      )) || <div>BANNED</div>}
      <div className="posts">{!loading && <Posts posts={posts} />}</div>

      <br />
      {status === "admin" && !loading && <Users users={users} />}
      <button onClick={() => fetchNewPosts()}></button>
    </>
  );
};
