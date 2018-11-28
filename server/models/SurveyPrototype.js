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
