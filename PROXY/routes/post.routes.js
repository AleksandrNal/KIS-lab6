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

//add post
router.post("/post", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

//del post
router.post("/delete", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

//change post
router.post("/change", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

//update last seen in user
router.post("/updateLastSeen", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

router.get("/getLastSeen", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

// return all posts with user name and id
router.get("/getPosts", [auth, cache("2 minutes")], async (req, res) => {
  try {
    const fetched = await axios.get(BASEURI + req.originalUrl);

    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

// return all posts with user name and id
router.get("/getPostsBefore", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

// return all posts with user name and id
router.get("/getPostsAfter", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

router.post("/like", auth, async (req, res) => {
  try {
    const fetched = await axios.post(BASEURI + req.originalUrl, {
      ...req.body,
      user: req.user.userId,
    });

    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

module.exports = router;
