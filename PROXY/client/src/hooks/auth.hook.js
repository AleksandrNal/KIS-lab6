import { useState, useCallback, useEffect } from "react";
const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState(null);
  const [status, setstatus] = useState(null);
  const [lastseen, setlastseen] = useState(null);

  const login = useCallback((jwtToken, id, status, lastseen) => {
    setToken(jwtToken);
    setUserId(id);
    setstatus(status);
    setlastseen(lastseen);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        status: status,
        lastseen: lastseen,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setstatus(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));

    if (data && data.token) {
      login(data.token, data.userId, data.status, data.lastseen);
    }
    setReady(true);
  }, [login]);

  return { login, logout, token, userId, ready, status, lastseen };
};
