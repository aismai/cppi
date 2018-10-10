const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load User model
const User = require("../../models/User");

// @route  GET api/users/register
// @desc   Register user
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

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
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

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
        { expiresIn: 86400 },
        (err, token) => {
          res.json({ login: true, token: `Bearer ${token}` });
        }
      );
    });
  });
});

module.exports = router;
