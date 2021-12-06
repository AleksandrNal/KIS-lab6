const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const { default: axios } = require("axios");
const apicache = require("apicache");

let cache = apicache.middleware;

const AUTHURI = config.get("authUri");

const router = new Router();

// /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const fetched = await axios.post(AUTHURI + req.originalUrl, req.body);

    res.status(201).json(fetched.data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "something goes wrong " });
  }
});

// /api/auth/login
router.post(
  "/login",
  [check("password", "enter password").exists()],
  async (req, res) => {
    try {
      const fetched = await axios.post(AUTHURI + req.originalUrl, req.body);
      res.status(201).json(fetched.data);
    } catch (e) {
      console.log(e.message);
      res.status(500).json({ message: "something goes wrong" });
    }
  }
);

module.exports = router;
