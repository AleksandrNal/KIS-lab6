const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const { default: axios } = require("axios");
const apicache = require("apicache");

let cache = apicache.middleware;
const app = express();

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/post", require("./routes/post.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

app.get("/api/getNews", cache("30 minutes"), async (req, res) => {
  try {
    console.log("123");
    console.log(config.get("newsUri") + req.originalUrl);
    const fetched = await axios.get(config.get("newsUri") + req.originalUrl);

    console.log("1234");
    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`started on port ${PORT}`));
