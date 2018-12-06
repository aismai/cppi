const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

const SurveyPrototype = require("../../models/SurveyPrototype");
const Survey = require("../../models/Survey");

// @route  GET api/surveys
// @desc   Get all surveys
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    SurveyPrototype.find()
      .populate({
        path: "questions",
        select: "body",
        populate: {
          path: "answers",
          select: "body"
        }
      })
      .then(prototypes => {
        if (!prototypes) {
          errors.nosurveys = "There are no surveys";
          res.status(404).json({ errors });
        }

        res.json(prototypes);
      });
  }
);

// @route  POST api/surveys
// @desc   Create survey-prototype
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const questionIds = req.body.questionIds.map(mongoose.Types.ObjectId);
    const newSurvey = new SurveyPrototype({
      name: req.body.name,
      questions: questionIds
    });
    newSurvey.save((err, doc) => {
      if (err) return res.json(err);

      res.status(201).json(doc);
    });
  }
);

// @route  GET api/surveys/:survey_id
// @desc   Get survey by id
// @access Private
router.get(
  "/:survey_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const surveyId = mongoose.Types.ObjectId(req.params.survey_id);
    SurveyPrototype.findOne({ _id: surveyId })
      .populate("questions", "body")
      .then(survey => {
        if (!survey) {
          errors.nosurvey = "There is no survey";
          res.status(404).json({ errors });
        }

        res.json(survey);
      });
  }
);

// @route  PUT api/surveys/:survey_id
// @desc   Update existing survey
// @access Private
router.put(
  "/:survey_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const surveyId = mongoose.Types.ObjectId(req.params.survey_id);
    SurveyPrototype.findOneAndUpdate({ _id: surveyId }, req.body, {
      new: true
    })
      .populate("questions", "body")
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

// @route  POST api/surveys/delete
// @desc   Delete multiple surveys
// @access Private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const surveyIds = req.body.surveyIds.map(mongoose.Types.ObjectId);

    SurveyPrototype.deleteMany({ _id: { $in: surveyIds } })
      .then(() =>
        Survey.deleteMany({ surveyPrototype: { $in: surveyIds } }).then(() => {
          res.json({ success: true });
        })
      )
      .catch(err => res.status(404).json(err));
  }
);

// todo: extract filled surveys routes to own namespace
// @route  POST api/surveys/fill-in-survey
// @desc   Create survey
// @access Private
router.post(
  "/fill-in-survey",
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

// @route  GET api/surveys/filled-in-surveys
// @desc   Get all filled in surveys
// @access Private
router.get(
  "/get/filled-in-surveys",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Survey.find().then(surveys => {
      if (!surveys) {
        errors.nosurveys = "There are no surveys";
        res.status(404).json({ errors });
      }

      res.json(surveys);
    });
  }
);

// @route  GET api/surveys/filled-in/:personal_data_id
// @desc   Get all filled in surveys
// @access Private
router.get(
  "/filled-in/:personal_data_id",
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
  "/update/filled-survey",
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
