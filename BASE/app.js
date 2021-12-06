const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json({ extended: true }));

app.use("/api/post", require("./routes/post.routes"));
app.use("/api/admin", require("./routes/admin.routes"));

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
