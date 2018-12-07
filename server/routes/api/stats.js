const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Survey = require("../../models/Survey");
const PersonalData = require("../../models/PersonalData");

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

module.exports = router;
