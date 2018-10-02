const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// load User model
const User = require("../../models/User");

// @route  GET api/users/test
// @desc   Test users route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Users route works" }));

// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const newUser = new User(req.body);

  newUser.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true, userdata: doc });
  });
});

// @route  GET api/users/login
// @desc   Login user
// @access Public
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) return res.json({ login: false, msg: "Email not found" });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({ login: false, msg: "Wrong Password" });

      const payload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname
      };

      jwt.sign(
        payload,
        process.env.SECRET,
        { expiresIn: "10h" },
        (err, token) => {
          res.json({ login: true, token: `Bearer ${token}` });
        }
      );
    });
  });
});

module.exports = router;
