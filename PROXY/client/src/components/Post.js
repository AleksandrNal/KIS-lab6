import React, { useContext, useState } from "react";
import { Loader } from "../components/Loader";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { LikeButton } from "./LikeButton";
import DOMPurify from "dompurify";

export const Post = ({ post, isnew }) => {
  const [changing, setchanging] = useState(false);
  const [content, setcontent] = useState(post.content);
  const [toChange, settoChange] = useState(content);
  const [exist, setexist] = useState(true);
  const { token, userId, status } = useContext(AuthContext);
  const { loading, request } = useHttp();

  const changeHandler = () => {
    setchanging(true);
  };

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        if (!toChange) {
          const data = await request(
            "/api/post/delete",
            "POST",
            { id: post._id },
            {
              Authorization: `Bearer ${token}`,
            }
          );

          setchanging(false);

          if (data.message === "deleted") {
            setexist(false);
            return;
          }
        }

        const data = await request(
          "/api/post/change",
          "POST",
          { id: post._id, content: toChange },
          {
            Authorization: `Bearer ${token}`,
          }
        );

        if (data.message === "changed") {
          setcontent(toChange);
        } else {
          settoChange(content);
        }

        setchanging(false);
      } catch (e) {}
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    exist && (
      <div className={"row " + (isnew ? "new" : "")}>
        <div className="col s9 offset-s1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                {new Date(post.date).toLocaleDateString()} from{" "}
                {(!!post.user && post.user.name) || "[deleted]"}
              </span>
              {(changing && (
                <input
                  className="white-text"
                  onKeyPress={pressHandler}
                  value={toChange}
                  onChange={(e) => {
                    settoChange(e.target.value);
                  }}
                ></input>
              )) || (
                <>
                  <p
                    className="card-content"
                    style={{ display: "inline-block" }}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(content),
                    }}
                  >
                    {/* {content} */}
                  </p>{" "}
                  {((!!post.user && userId === post.user._id) ||
                    status === "admin") && (
                    <button
                      className="right waves-effect waves-light btn"
                      style={{ display: "inline-block" }}
                      onClick={changeHandler}
                    >
                      change
                    </button>
                  )}
                  <LikeButton liking={post.liked} id={post._id} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
