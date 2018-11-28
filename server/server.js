const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");

require("dotenv").config();
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");
const personalData = require("./routes/api/personalData");
const surveys = require("./routes/api/surveys");

const app = express();

// Passport middleware
app.use(passport.initialize());

// Passport configuraton
require("./config/passport")(passport);
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

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
app.use("/api/profile", profile);
app.use("/api/questions", questions);
app.use("/api/personal-data", personalData);
app.use("/api/surveys", surveys);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
