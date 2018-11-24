const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

const Question = require("../../models/Question");

// @route  GET api/questions
// @desc   Get all questions
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Question.find().then(questions => {
      if (!questions) {
        errors.noquestions = "There are no questions";
        res.status(404).json({ errors });
      }

      res.json(questions);
    });
  }
);

// @route  POST api/questions
// @desc   Create question
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newQuestion = new Question(req.body);
    newQuestion.save((err, doc) => {
      if (err) return res.json(err);

      res.status(201).json(doc);
    });
  }
);

// @route  GET api/questions/:question_id
// @desc   Get question by Id
// @access Private
router.get(
  "/:question_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const questionId = mongoose.Types.ObjectId(req.params.question_id);
    Question.findOne({ _id: questionId }).then(question => {
      if (!question) {
        errors.noquestion = "There is no question";
        res.status(404).json({ errors });
      }
      res.json(question);
    });
  }
);

// @route  PUT api/questions/:question_id
// @desc   Update existing question
// @access Private
router.put(
  "/:question_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const questionId = mongoose.Types.ObjectId(req.params.question_id);
    Question.findOneAndUpdate({ _id: questionId }, req.body, { new: true })
      .then(question => {
        if (!question) {
          errors.noquestion = "There is no question";
          res.status(404).json({ errors });
        }

        res.json(question);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route  POST api/questions/delete
// @desc   Delete multiple questions
// @access Private
router.post(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const questionsIds = req.body.questionsIds.map(mongoose.Types.ObjectId);

    Question.remove({ _id: { $in: questionsIds } })
      .then(() => res.json({ success: true }))
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
