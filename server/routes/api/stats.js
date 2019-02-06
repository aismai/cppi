const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Survey = require("../../models/Survey");
const PersonalData = require("../../models/PersonalData");
const Questions = require("../../models/Question");

// @route  GET api/stats
// @desc   Get text statistics data
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    const stats = {
      mvd: 0,
      gknb: 0,
      gsin: 0,
      municipality: 0,
      minzdrav: 0,
      procecutor: 0,
      bishkek: 0,
      osh: 0,
      chui: 0,
      batken: 0,
      djalalabad: 0,
      ik: 0,
      naryn: 0,
      oshobl: 0,
      talas: 0,
      male: 0,
      female: 0
    };

    Survey.find().then(surveys => {
      stats.violations = surveys.length;

      surveys.forEach(survey => {
        if (survey.department === "МВД") stats.mvd += 1;
        if (survey.department === "ГКНБ") stats.gknb += 1;
        if (survey.department === "ГСИН") stats.gsin += 1;
        if (survey.department === "Минздрав") stats.minzdrav += 1;
        if (survey.department === "Муниципалитет") stats.municipality += 1;
        if (survey.department === "Прокуратура") stats.procecutor += 1;
        if (survey.region === "Бишкек") stats.bishkek += 1;
        if (survey.region === "Ош") stats.osh += 1;
        if (survey.region === "Чуйская область") stats.chui += 1;
        if (survey.region === "Баткенская область") stats.batken += 1;
        if (survey.region === "Джалал-Абадская область") stats.djalalabad += 1;
        if (survey.region === "Иссык-Кульская область") stats.ik += 1;
        if (survey.region === "Нарынская область") stats.naryn += 1;
        if (survey.region === "Ошская область") stats.oshobl += 1;
        if (survey.region === "Таласская область") stats.talas += 1;
      });

      PersonalData.find().then(data => {
        data.forEach(datum => {
          if (datum.gender === "мужской") stats.male += 1;
          if (datum.gender === "женский") stats.female += 1;
        });

        res.json(stats);
      });
    });
  }
);

//todo: refactor this asap...
// @route  GET api/stats/questions
// @desc   Get questions used in statistics
// @access Private
router.get(
  "/questions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const questionStatistics = [];
    let selectedAnswers = [];

    Survey.find().then(surveys => {
      surveys.forEach(survey => {
        selectedAnswers = [
          ...selectedAnswers,
          ...survey.selectedAnswers.map(answer => answer.answerId)
        ];
      });

      Questions.find({ isUsedInStatistics: true }).then(questions => {
        questions.forEach(question => {
          const answeredQuestion = {
            id: question._id,
            body: question.body,
            answers: []
          };

          question.answers.forEach(answer => {
            const answerId = answer._id.toHexString();
            selectedAnswers.forEach(selectedAnswerId => {
              if (selectedAnswerId === answerId) {
                const array = answeredQuestion.answers.map(
                  elem => elem.answerId
                );

                if (array.includes(answerId)) {
                  answeredQuestion.answers.forEach(answ => {
                    if (answ.answerId === answerId) {
                      answ.quantity = answ.quantity += 1;
                    }
                  });
                } else {
                  answeredQuestion.answers.push({
                    answerId: answerId,
                    answerBody: answer.body,
                    quantity: 1
                  });
                }
              }
            });
          });

          questionStatistics.push(answeredQuestion);
        });

        res.json(questionStatistics);
      });
    });
  }
);

const getDescendantProp = (obj, path) =>
  path.split(".").reduce((acc, part) => acc && acc[part], obj);

module.exports = router;
