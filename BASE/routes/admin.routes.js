const { Router } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const router = Router();

//block user
router.post("/block", async (req, res) => {
  try {
    // const isAdmin = await User.findById(req.user.userId);
    // if (!(isAdmin.status === "admin")) {
    //   res.status(400).json({ message: "not admin" });
    // }
    const { id } = req.body;

    const user = await User.findById(id);

    user.status = "blocked";

    await user.save();
    res.status(201).json({ message: "blocked" });
  } catch (e) {}
});

//unblock user
router.post("/unblock", async (req, res) => {
  try {
    // const isAdmin = await User.findById(req.user.userId);
    // if (!(isAdmin.status === "admin")) {
    //   res.status(400).json({ message: "not admin" });
    // }

    const { id } = req.body;

    const user = await User.findById(id);
    user.status = "user";

    await user.save();
    res.status(201).json({ message: "unblocked" });
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

router.get("/getUsers", async (req, res) => {
  try {
    // const isAdmin = await User.findById(req.user.userId);
    // if (!(isAdmin.status === "admin")) {
    //   res.status(400).json({ message: "not admin" });
    // }

    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

async function delLike(userid) {
  var posts = await Post.find({ liked: userid });
  console.log(userid);
  console.log(posts);
  posts.forEach(async (post) => {
    var index = post.liked.indexOf(userid);
    if (index !== -1) {
      post.liked.splice(index, 1);
      await post.save();
    }
  });
  console.log(posts);
}

router.post("/delete", async (req, res) => {
  try {
    // const isAdmin = await User.findById(req.user.userId);
    // if (!(isAdmin.status === "admin")) {
    //   res.status(400).json({ message: "not admin" });
    // }

    const { id } = req.body;

    const user = await User.findById(id);
    user.status = "user";

    await User.findOneAndDelete({ _id: id });
    await delLike(id);

    res.status(201).json({ message: "user deleted" });
  } catch (e) {
    res.status(500).json({ message: "something goes wrong " });
  }
});

module.exports = router;
