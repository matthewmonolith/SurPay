const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();
require("./models/User");
require("./services/passport");

mongoose.connect(process.env.DB_STRING);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, //30 days
    keys: [process.env.COOKIEKEY], //The keys array is used to assign or encrypt the cookie. When you pass more than one key, it randomly selects one of the keys.
  })
);

app.use(passport.initialize()) //tell passport to use cookies to handle authentication
app.use(passport.session())


require("./routes/authRoutes")(app);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log("Server is running");
});
