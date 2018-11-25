const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

const PersonalData = require("../../models/PersonalData");

// @route  GET api/personal-data
// @desc   Get all data
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    PersonalData.find().then(personalData => {
      if (!personalData) {
        error.noData = "There are no personal data";
        res.status(404).json({ errors });
      }

      res.json(personalData);
    });
  }
);

// @route  POST api/personal-data
// @desc   Create personal data
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newPersonalData = new PersonalData(req.body);
    newPersonalData.save((err, doc) => {
      if (err) return res.json(err);

      res.status(201).json(doc);
    });
  }
);

// @route  GET api/personal-data/:datum_id
// @desc   Get personal datum
// @access Private
router.get(
  "/:datum_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const datumId = mongoose.Types.ObjectId(req.params.datum_id);
    PersonalData.findOne({ _id: datumId }).then(datum => {
      if (!datum) {
        errors.nodatum = "There is no datum";
        res.status(404).json({ errors });
      }

      res.json(datum);
    });
  }
);

// @route  PUT api/personal-data/:datum_id
// @desc   Update existing personal datum
// @access Private
router.put(
  "/:datum_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const datumId = mongoose.Types.ObjectId(req.params.datum_id);
    PersonalData.findOneAndUpdate({ _id: datumId }, req.body, {
      new: true
    })
      .then(datum => {
        if (!datum) {
          errors.updatefailed = "Update failed";
          res.status(400).json({ errors });
        }

        res.json(datum);
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route  POST api/personal-data/delete
// @desc   Delete multiple personal data
// @access Private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const dataIds = req.body.dataIds.map(mongoose.Types.ObjectId);

    PersonalData.remove({ _id: { $in: dataIds } })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
