const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const mongoose = require("mongoose");

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

// @route  GET api/users/all
// @desc   Get all users
// @access Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.find({}, { email: 1, name: 1, lastname: 1, createdAt: 1 }).then(
      users => {
        if (!users) {
          errors.nouser = "There are no users";
          res.status(404).json({ errors });
        }

        res.json(users);
      }
    );
  }
);

// @route  POST api/users/delete
// @desc   Delete multiple users
// @access Private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userIds = req.body.userIds.map(mongoose.Types.ObjectId);

    User.remove({ _id: { $in: userIds } })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
