const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveyPrototypeSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }]
});

module.exports = SurveyPrototype = mongoose.model(
  "SurveyPrototype",
  SurveyPrototypeSchema
);

// date: {
//   type: Date,
//   required: true,
//   default: Date.now
// },
// region: {
//   type: String,
//   required: true,
//   maxlength: 255
// },
// village: {
//   type: String,
//   required: true,
//   maxlength: 255
// },
// place: {
//   type: String,
//   required: true,
//   maxlength: 255
// },
// department: {
//   type: String,
//   required: true,
//   maxlength: 255
// },
// subDepartment: {
//   type: String,
//   required: true,
//   maxlength: 255
// },
// numberOfPersons: {
//   type: String,
//   required: true,
//   maxlength: 2
// },
// description: {
//   type: String
// },
// evidence: {
//   type: String
// },
