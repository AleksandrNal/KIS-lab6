const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Post = require("../models/Post");

const router = new Router();

// /api/auth/register
router.post(
  "/register",
  [check("email", "incorrect email").normalizeEmail().isEmail()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "registration: incorrect data",
        });
      }
      const { name, email, password } = req.body;
      let candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "this email or name is already taken" });
      }

      candidate = await User.findOne({ name });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "this email or name is already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ name, password: hashedPassword, email });

      await user.save();

      res.status(201).json({ message: "user is created" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "something goes wrong " });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [check("password", "enter password").exists()],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors: errors.array(), message: "login: incorrect data" });
      }

      const { name, password } = req.body;
      const user = await User.findOne({ name }).populate("lastSeen");
      if (!user) {
        return res.status(400).json({ message: "user is not founded" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "incorrect password, try again" });
      }

      // if ((user.status === "deleted")) {
      //   return res.status(400).json({ message: "deleted" });
      // }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "12h",
      });

      let date = null;
      if (user.lastSeen) {
        date = user.lastSeen.date;
      }

      res.json({
        token,
        userId: user.id,
        status: user.status,
        lastseen: date,
      });
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "something goes wrong" });
    }
  }
);

module.exports = router;
