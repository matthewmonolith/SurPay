const express = require("express");
const passport = require("passport");
import dotenv from "dotenv";
dotenv.config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(accessToken, refreshToken, profile, done);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback", passport.authenticate("google")); //code is in this route

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log("Server is running");
});
