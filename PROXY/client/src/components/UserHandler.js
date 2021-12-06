import React, { useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const User = ({ user }) => {
  const { loading, error, request, clearError } = useHttp();
  const { token } = useContext(AuthContext);
  const message = useMessage();
  const [status, setstatus] = useState(user.status);
  const [exist, setexist] = useState(true);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const blockHandler = async (id) => {
    try {
      const data = await request(
        "/api/admin/block",
        "POST",
        {
          id,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      message(data.message);

      if (data.message === "blocked") {
        setstatus("blocked");
      }
    } catch (e) {}
  };

  const unblockHandler = async (id) => {
    try {
      const data = await request(
        "/api/admin/unblock",
        "POST",
        {
          id,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message(data.message);

      if (data.message === "unblocked") {
        setstatus("user");
      }
    } catch (e) {}
  };

  const deleteHandler = async (id) => {
    try {
      const data = await request(
        "/api/admin/delete",
        "POST",
        {
          id,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      message(data.message);

      setexist(false);
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  return (
    exist && (
      <div className="row">
        <div className="col s9 offset-s1">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                {/* {user.name} is {user.status} */}
                {user.name} is{" "}
                {(status === "blocked" && "blocked") || "not blocked"}
              </span>
            </div>
            {!(status === "admin") && (
              <div class="card-action">
                <a disabled={loading} onClick={() => blockHandler(user._id)}>
                  block
                </a>
                <a disabled={loading} onClick={() => unblockHandler(user._id)}>
                  unblock
                </a>
                <a disabled={loading} onClick={() => deleteHandler(user._id)}>
                  delete
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};
