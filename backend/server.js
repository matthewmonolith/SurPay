const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("../config/dev");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.DB_STRING);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, //30 days
    keys: [keys.COOKIEKEY], //The keys array is used to assign or encrypt the cookie. When you pass more than one key, it randomly selects one of the keys.
  })
);

app.use(passport.initialize()); //tell passport to use cookies to handle authentication
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log("Server is running");
});
