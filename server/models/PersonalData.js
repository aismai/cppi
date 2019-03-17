const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonalDataSchema = new Schema({
  caseName: {
    type: String,
    required: true,
    maxlength: 255
  },
  registrationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  source: {
    type: String,
    required: true,
    maxlength: 255
  },
  code: {
    type: String,
    required: true,
    maxlength: 255
  },
  dateOfBirth: {
    type: Date,
    required: true,
    default: Date.now
  },
  personalDocument: {
    type: String,
    required: true,
    maxlength: 255
  },
  gender: {
    type: String,
    required: true,
    maxlength: 255
  },
  maritalStatus: {
    type: Boolean,
    default: false
  },
  criminalStatus: {
    type: String
  },
  keyGroup: [
    {
      type: String
    }
  ],
  registration: {
    type: String,
    maxlength: 255
  },
  citizenship: {
    type: String,
    maxlength: 255
  },
  education: {
    type: String,
    maxlength: 255
  },
  nationality: {
    type: String,
    required: true,
    maxlength: 255
  },
  employment: {
    type: String,
    required: true,
    maxlength: 255
  },
  socialStatus: {
    type: String,
    maxlength: 255
  },
  children: [
    {
      age: {
        type: String,
        maxlength: 2
      }
    }
  ],
  location: {
    type: String,
    maxlength: 255
  },
  relativesPhone: {
    type: String,
    maxlength: 255
  },
  lawyerPhone: {
    type: String,
    maxlength: 255
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = PersonalData = mongoose.model(
  "PersonalData",
  PersonalDataSchema
);
