const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route  GET api/profile/test
// @desc   Test profile route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Profile route works" }));

// @route  GET api/profile
// @desc   Get current users profile
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "lastname"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/profile
// @desc   Create user profile
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.user = req.user.id;
    if (profileFields.phone) profileFields.phone = req.body.phone;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

// @route  GET api/profile/all
// @desc   Get all profiles
// @access Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.find()
      .populate("user", ["name", "lastname", "email"])
      .then(profiles => {
        if (!profiles) {
          error.noprofile = "There are no profiles";
          res.status(404).json({ error });
        }

        res.json(profiles);
      })
      .catch(err => res.json({ profile: "There are no profiles" }));
  }
);

// @route  GET api/profile/user/:user_id
// @desc   Get user by ID
// @access Private
router.get(
  "/user/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
      .populate("user", ["name", "lastname", "email"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
