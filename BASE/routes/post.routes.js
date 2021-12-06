const { Router } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const router = Router();

//add post
router.post("/post", async (req, res) => {
  try {
    const { userId, content } = req.body;

    const post = new Post({ user: userId, content });
    await post.save();

    res.status(201).json({ message: "posted" });
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

//del post
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await Post.findOneAndDelete({ _id: id });
    console.log(id);
    res.status(201).json({ message: "deleted" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

//change post
router.post("/change", async (req, res) => {
  try {
    const { id, content } = req.body;

    const post = await Post.findById(id);
    post.content = content;

    await post.save();

    res.status(201).json({ message: "changed" });
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

//update last seen in user
router.post("/updateLastSeen", async (req, res) => {
  try {
    const { userId, messageId } = req.body;

    const user = await User.findById(userId);
    user.lastSeen = messageId;

    await user.save();

    res.status(201).json({ message: "updated" });
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

router.post("/getLastSeen", async (req, res) => {
  try {
    const user = await User.findById(req.body.user).populate("lastSeen");
    if (user.lastSeen) {
      res.json(user.lastSeen.date);
    } else {
      res.json(null);
    }
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

// return all posts with user name and id
router.get("/getPosts", async (req, res) => {
  try {
    var posts = await Post.find().populate("user", "name id");

    res.json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

// return all posts with user name and id
router.post("/getPostsBefore", async (req, res) => {
  try {
    const user = await User.findById(req.body.user).populate("lastSeen");
    const lastseen = user.lastSeen.date;

    var posts = await Post.find({
      date: { $lte: new Date(lastseen) },
    }).populate("user", "name id");
    res.json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

// return all posts with user name and id
router.post("/getPostsAfter", async (req, res) => {
  try {
    const user = await User.findById(req.body.user).populate("lastSeen");
    const lastseen = user.lastSeen.date;
    var posts = await Post.find({
      date: { $gte: new Date(lastseen) },
    }).populate("user", "name id");

    res.json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

router.post("/like", async (req, res) => {
  try {
    const { messageId } = req.body;
    const user = req.body.user;

    var post = await Post.findById(messageId);

    if (post.liked.includes(user)) {
      var index = post.liked.indexOf(user);
      if (index !== -1) {
        post.liked.splice(index, 1);
      }
    } else {
      post.liked.push(user);
    }

    await post.save();

    res.status(201).json({ message: "liked" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "something goes wrong " });
  }
});

module.exports = router;
