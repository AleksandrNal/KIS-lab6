import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <nav>
      <div class="nav-wrapper blue darken-1" style={{ padding: "0 2rem" }}>
        <span href="/" class="brand-logo">
          4Reddit
        </span>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <a href="/forum">Forum</a>
          </li>
          <li>
            <a href="/news">News</a>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Exit
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
