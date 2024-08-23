const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("../config/dev");
require("./models/User");
require("./models/Survey");
require("./services/passport");

//Initialisation
mongoose.connect(keys.DB_STRING);

const app = express();

//Middleware
app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.COOKIEKEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

//Port
const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log("Server is running");
});

//Production Only
if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets such as main.js
  app.use(express.static("client/build"));
  //Express will serve up index.html if it doesn't recognise the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
