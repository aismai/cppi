const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

const SurveyPrototype = require("../../models/SurveyPrototype");
const Survey = require("../../models/Survey");

// @route  GET api/surveys
// @desc   Get all filled surveys
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Survey.find()
      .populate({
        path: "surveyPrototype",
        select: "name",
        populate: {
          path: "questions",
          select: "body",
          populate: {
            path: "answers",
            select: "body"
          }
        }
      })
      .then(surveys => {
        if (!surveys) {
          errors.nosurveys = "There are no surveys";
          res.status(404).json({ errors });
        }

        res.json(surveys);
      });
  }
);

// @route  POST api/surveys
// @desc   Create survey
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newSurvey = new Survey(req.body);
    newSurvey.save((err, doc) => {
      if (err) return res.json(err);
      const surveyPrototypeId = doc.surveyPrototype;
      SurveyPrototype.findOne({ _id: surveyPrototypeId })
        .populate({
          path: "questions",
          select: "body",
          populate: {
            path: "answers",
            select: "body"
          }
        })
        .then(proto => {
          doc.surveyPrototype = proto;
          res.status(201).json(doc);
        });
    });
  }
);

// @route  GET api/surveys/:personal_data_id
// @desc   Get all filled in surveys
// @access Private
router.get(
  "/:personal_data_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const datumId = mongoose.Types.ObjectId(req.params.personal_data_id);
    Survey.find({ person: datumId })
      .populate({
        path: "surveyPrototype",
        select: "name",
        populate: {
          path: "questions",
          select: "body",
          populate: {
            path: "answers",
            select: "body"
          }
        }
      })
      .then(survey => {
        if (!survey) {
          errors.nosurvey = "There are no surveys";
          res.status(404).json({ errors });
        }

        res.json(survey);
      });
  }
);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const surveyId = mongoose.Types.ObjectId(req.body._id);
    Survey.findOneAndUpdate({ _id: surveyId }, req.body, {
      new: true
    })
      .populate({
        path: "surveyPrototype",
        select: "name",
        populate: {
          path: "questions",
          select: "body",
          populate: {
            path: "answers",
            select: "body"
          }
        }
      })
      .then(survey => {
        if (!survey) {
          errors.nosurvey = "There is no survey";
          res.status(404).json({ errors });
        }

        res.json(survey);
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
