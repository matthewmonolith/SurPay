const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("../config/dev");
require("./models/User");
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

//Port
const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log("Server is running");
});
