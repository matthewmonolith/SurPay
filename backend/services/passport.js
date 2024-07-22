const passport = require("passport");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
dotenv.config();

const User = mongoose.model("users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then((user) => {
        if (user) {
          done(null, user); //arrow function to communicate to passport if there's an error, first arg null means no error/it's fine, second arg is the found user, passport uses for auth furtherance
        } else {
          new User({ googleId: profile.id })
            .save()
            .then((user) => done(null, user)); //end up with two model instances of user, both representing the same record in the DB collection, make use of the one from the promise callback as it might have changed when the first one was being saved
        }
      });
    }
  )
);
