const { Router } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const { default: axios } = require("axios");
const apicache = require("apicache");

let cache = apicache.middleware;

const BASEURI = config.get("baseUri");
const router = Router();

//block user
router.post("/block", auth, async (req, res) => {
  try {
    const isAdmin = await User.findById(req.user.userId);
    if (!(isAdmin.status === "admin")) {
      res.status(400).json({ message: "not admin" });
    }

    const fetched = await axios.post(BASEURI + req.originalUrl, req.body);

    res.status(201).json(fetched.data);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

//unblock user
router.post("/unblock", auth, async (req, res) => {
  try {
    const isAdmin = await User.findById(req.user.userId);
    if (!(isAdmin.status === "admin")) {
      res.status(400).json({ message: "not admin" });
    }

    const fetched = await axios.post(BASEURI + req.originalUrl, req.body);

    res.status(201).json(fetched.data);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

router.get("/getUsers", [auth, cache("30 minutes")], async (req, res) => {
  try {
    const isAdmin = await User.findById(req.user.userId);
    if (!(isAdmin.status === "admin")) {
      res.status(400).json({ message: "not admin" });
    }

    const fetched = await axios.get(BASEURI + req.originalUrl);

    res.status(201).json(fetched.data);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

router.post("/delete", auth, async (req, res) => {
  try {
    const isAdmin = await User.findById(req.user.userId);
    if (!(isAdmin.status === "admin")) {
      res.status(400).json({ message: "not admin" });
    }

    const fetched = await axios.post(BASEURI + req.originalUrl, req.body);

    res.status(201).json(fetched.data);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

module.exports = router;
