const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const excel = require("node-excel-export");

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
      otherDepartment: 0,
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
      female: 0,
      luin: 0,
      bz: 0,
      rs: 0,
      ztm: 0,
      ljv: 0,
      lgbt: 0,
      lovz: 0,
      keyGroupOther: 0,
      nationalityKyrghyz: 0,
      nationalityKazakh: 0,
      nationalityRussian: 0,
      nationalityUigur: 0,
      nationalityUzbek: 0,
      nationalityOther: 0
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
        if (survey.department === "Другое") stats.otherDepartment += 1;

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
          if (datum.nationality === "Кыргыз") stats.nationalityKyrghyz += 1;
          if (datum.nationality === "Русский") stats.nationalityRussian += 1;
          if (datum.nationality === "Уйгур") stats.nationalityUigur += 1;
          if (datum.nationality === "Казах") stats.nationalityKazakh += 1;
          if (datum.nationality === "Узбек") stats.nationalityUzbek += 1;
          if (datum.nationality === "Другое") stats.nationalityOther += 1;

          if (datum.keyGroup.includes("ЛУИН")) stats.luin += 1;
          if (datum.keyGroup.includes("БЗ")) stats.bz += 1;
          if (datum.keyGroup.includes("РС")) stats.rs += 1;
          if (datum.keyGroup.includes("Клиент ЗТМ")) stats.ztm += 1;
          if (datum.keyGroup.includes("ЛЖВ")) stats.ljv += 1;
          if (datum.keyGroup.includes("ЛГБТ")) stats.lgbt += 1;
          if (datum.keyGroup.includes("ЛОВЗ")) stats.lovz += 1;
          if (datum.keyGroup.includes("Другое")) stats.keyGroupOther += 1;
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

// You can define styles as json object
const styles = {
  headerRed: {
    fill: {
      fgColor: {
        rgb: "FFFFFFFF"
      }
    },
    font: {
      color: {
        rgb: "b30000"
      },
      sz: 14,
      bold: true,
      underline: true
    }
  },
  headerDark: {
    fill: {
      fgColor: {
        rgb: "FFFFFFFF"
      }
    },
    font: {
      color: {
        rgb: "000000"
      },
      sz: 14,
      bold: true,
      underline: true
    }
  }
};

const specification = {
  fieldName: {
    // <- the key should match the actual data key
    displayName: "Поле", // <- Here you specify the column header
    headerStyle: styles.headerDark, // <- Header style
    width: 420 // <- width in pixels
  },
  value: {
    displayName: "Количество",
    headerStyle: styles.headerRed,
    width: 100 // <- width in chars (when the number is passed as string)
  }
};

// @route  GET api/stats/export-excel
// @desc   Get questions used in statistics
// @access Private
router.get(
  "/export-excel",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const dataset = [];
    const departments = {
      МВД: 0,
      ГКНБ: 0,
      ГСИН: 0,
      Минздрав: 0,
      Муниципалитет: 0,
      Прокуратура: 0,
      Другое: 0
    };
    const regions = {
      Бишкек: 0,
      Ош: 0,
      "Чуйская область": 0,
      "Баткенская область": 0,
      "Джалал-Абадская область": 0,
      "Иссык-Кульская область": 0,
      "Нарынская область": 0,
      "Ошская область": 0,
      "Таласская область": 0
    };

    let selectedAnswers = [];
    const questionStatistics = [];
    const answers = {};

    Survey.find().then(surveys => {
      dataset.push({ fieldName: "Нарушений", value: surveys.length });
      dataset.push({ fieldName: "", value: "" });

      surveys.forEach(survey => {
        selectedAnswers = [
          ...selectedAnswers,
          ...survey.selectedAnswers.map(answer => answer.answerId)
        ];

        if (survey.department === "МВД") departments.МВД += 1;
        if (survey.department === "ГКНБ") departments.ГКНБ += 1;
        if (survey.department === "ГСИН") departments.ГСИН += 1;
        if (survey.department === "Минздрав") departments.Минздрав += 1;
        if (survey.department === "Муниципалитет")
          departments.Муниципалитет += 1;
        if (survey.department === "Прокуратура") departments.Прокуратура += 1;
        if (survey.department === "Другое") departments.Другое += 1;

        if (survey.region === "Бишкек") regions.Бишкек += 1;
        if (survey.region === "Ош") regions.Ош += 1;
        if (survey.region === "Чуйская область")
          regions["Чуйская область"] += 1;
        if (survey.region === "Баткенская область")
          regions["Баткенская область"] += 1;
        if (survey.region === "Джалал-Абадская область")
          regions["Баткенская область"] += 1;
        if (survey.region === "Иссык-Кульская область")
          regions["Иссык-Кульская область"] += 1;
        if (survey.region === "Нарынская область")
          regions["Нарынская область"] += 1;
        if (survey.region === "Ошская область") regions["Ошская область"] += 1;
        if (survey.region === "Таласская область")
          regions["Таласская область"] += 1;
      });

      PersonalData.find().then(data => {
        const personalData = {
          Женский: 0,
          Мужской: 0,
          "Мониторинг МЛОС": 0,
          "Мониторинг судов": 0,
          "НЦПП / Омбудсмен": 0,
          "Гос.органы": 0,
          "Мониторинг пунктов ЗТМ / И других мест": 0,
          СМИ: 0,
          "Обращение непосредственно в фонд": 0,
          "Из других НПО": 0,
          Другое: 0
        };

        const citizenship = {
          Кыргыз: 0,
          Русский: 0,
          Уйгур: 0,
          Казах: 0,
          Узбек: 0,
          Другое: 0
        };

        const keyGroup = {
          ЛУИН: 0,
          БЗ: 0,
          РС: 0,
          "Клиент ЗТМ": 0,
          ЛЖВ: 0,
          ЛГБТ: 0,
          ЛОВЗ: 0,
          Другое: 0
        };

        data.forEach(datum => {
          if (datum.gender === "мужской") personalData.Мужской += 1;
          if (datum.gender === "женский") personalData.Женский += 1;
          if (datum.source === "Мониторинг МЛОС")
            personalData["Мониторинг МЛОС"] += 1;
          if (datum.source === "Мониторинг судов")
            personalData["Мониторинг судов"] += 1;
          if (datum.source === "НЦПП / Омбудсмен")
            personalData["НЦПП / Омбудсмен"] += 1;
          if (datum.source === "Гос.органы") personalData["Гос.органы"] += 1;
          if (datum.source === "Мониторинг пунктов ЗТМ / И других мест")
            personalData["Мониторинг пунктов ЗТМ / И других мест"] += 1;
          if (datum.source === "СМИ") personalData["СМИ"] += 1;
          if (datum.source === "Обращение непосредственно в фонд")
            personalData["Обращение непосредственно в фонд"] += 1;
          if (datum.source === "Из других НПО")
            personalData["Из других НПО"] += 1;
          if (datum.source === "Другое") personalData["Другое"] += 1;

          if (datum.nationality === "Кыргыз") citizenship.Кыргыз += 1;
          if (datum.nationality === "Русский") citizenship.Русский += 1;
          if (datum.nationality === "Уйгур") citizenship.Уйгур += 1;
          if (datum.nationality === "Казах") citizenship.Казах += 1;
          if (datum.nationality === "Узбек") citizenship.Узбек += 1;
          if (datum.nationality === "Другое") citizenship.Другое += 1;

          if (datum.keyGroup.includes("ЛУИН")) keyGroup.ЛУИН += 1;
          if (datum.keyGroup.includes("БЗ")) keyGroup.БЗ += 1;
          if (datum.keyGroup.includes("РС")) keyGroup.РС += 1;
          if (datum.keyGroup.includes("Клиент ЗТМ"))
            keyGroup["Клиент ЗТМ"] += 1;
          if (datum.keyGroup.includes("ЛЖВ")) keyGroup.ЛЖВ += 1;
          if (datum.keyGroup.includes("ЛГБТ")) keyGroup.ЛГБТ += 1;
          if (datum.keyGroup.includes("ЛОВЗ")) keyGroup.ЛОВЗ += 1;
          if (datum.keyGroup.includes("Другое")) keyGroup.Другое += 1;
        });

        Questions.find({ isUsedInStatistics: true }).then(questions => {
          Object.entries(departments).map(entry => {
            dataset.push({ fieldName: entry[0], value: entry[1] });
          });

          dataset.push({ fieldName: "", value: "" });
          Object.entries(regions).map(entry => {
            dataset.push({ fieldName: entry[0], value: entry[1] });
          });

          dataset.push({ fieldName: "", value: "" });
          Object.entries(personalData).map(entry => {
            dataset.push({ fieldName: entry[0], value: entry[1] });
          });

          dataset.push({ fieldName: "", value: "" });
          Object.entries(citizenship).map(entry => {
            dataset.push({ fieldName: entry[0], value: entry[1] });
          });

          dataset.push({ fieldName: "", value: "" });
          Object.entries(keyGroup).map(entry => {
            dataset.push({ fieldName: entry[0], value: entry[1] });
          });

          questions.forEach(question => {
            dataset.push({ fieldName: "", value: "" });

            dataset.push({ fieldName: question.body, value: "" });

            question.answers.forEach(answer => {
              const answerId = answer._id.toHexString();
              selectedAnswers.forEach(selectedAnswerId => {
                if (selectedAnswerId === answerId) {
                  if (answers[answer.body]) {
                    answers[answer.body] += 1;
                  } else {
                    answers[answer.body] = 1;
                  }
                }
              });
              dataset.push({
                fieldName: answer.body,
                value: answers[answer.body]
              });
            });
          });

          const report = excel.buildExport([
            {
              name: "Stats",
              merges: [],
              specification: specification,
              data: dataset
            }
          ]);

          res.attachment("report.xlsx"); // This is sails.js specific (in general you need to set headers)
          res.send(report);
        });
      });
    });
  }
);

module.exports = router;
