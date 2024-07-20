const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
require("./services/passport");
require("./models/User");

mongoose.connect(process.env.DB_STRING);

const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log("Server is running");
});
