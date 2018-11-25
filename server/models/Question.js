const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  body: {
    type: String,
    required: true,
    maxlength: 255
  },
  answers: [
    {
      body: {
        type: String,
        maxlength: 255
      }
    }
  ]
});

module.exports = Question = mongoose.model("Question", QuestionSchema);
