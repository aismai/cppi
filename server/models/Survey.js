const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: "PersonalData"
  },

  surveyPrototype: {
    type: Schema.Types.ObjectId,
    ref: "SurveyPrototype"
  },

  date: {
    type: Date,
    // required: true,
    default: Date.now
  },
  region: {
    type: String,
    // required: true,
    maxlength: 255
  },
  village: {
    type: String,
    // required: true,
    maxlength: 255
  },
  place: {
    type: String,
    // required: true,
    maxlength: 255
  },
  department: {
    type: String,
    // required: true,
    maxlength: 255
  },
  subDepartment: {
    type: String,
    // required: true,
    maxlength: 255
  },
  numberOfPersons: {
    type: String,
    // required: true,
    maxlength: 2
  },
  description: {
    type: String
  },
  evidence: {
    type: String
  },

  selectedAnswers: [
    {
      body: {
        type: String,
        maxlength: 255
      },
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question"
      }
    }
  ]
});

module.exports = Survey = mongoose.model("Survey", SurveySchema);
