const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json({ extended: true }));
app.use("/api", require("./routes"));

const PORT = config.get("port") || 5000;

app.listen(PORT, () => console.log(`started on port ${PORT}`));
