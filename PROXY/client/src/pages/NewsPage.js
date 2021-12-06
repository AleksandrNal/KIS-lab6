import React, { useEffect, useState, useCallback } from "react";
const axios = require("axios");

export const NewsPage = () => {
  const [news, setNews] = useState([]);

  const getNews = useCallback(async () => {
    const res = await axios.get("/api/getNews");
    console.log(res.data.items);
    setNews(res.data.items);
  }, []);

  useEffect(() => {
    getNews();
  }, [getNews]);

  return (
    <div className="App">
      {news.length > 0 &&
        news.map((item) => {
          return (
            <div style={{ margin: "1rem" }}>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "1rem" }}>
                  {new Date(item.pubDate).toLocaleTimeString()}
                </p>
                <h3>{item.title}</h3>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  style={{ maxHeight: 100, width: "auto" }}
                  src={item.enclosure.url}
                />
                <p style={{ marginLeft: "1rem" }}>{item.content}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
