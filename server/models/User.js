const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT = 10;
require("dotenv").config();

// Create Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 100
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 1
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    return bcrypt.genSalt(SALT, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  }

  next();
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

module.exports = User = mongoose.model("User", UserSchema);
