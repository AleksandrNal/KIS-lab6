import { createContext } from "react";

function noop() {}

export const AuthContext = createContext({
  status: null,
  token: null,
  userId: null,
  lastseen: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
