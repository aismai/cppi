const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

require("dotenv").config();
const users = require("./routes/api/users");

const app = express();

// Passport middleware
app.use(passport.initialize());

// Passport configuraton
require("./config/passport")(passport);
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// DB config
mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.DATABASE,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// use routes
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
