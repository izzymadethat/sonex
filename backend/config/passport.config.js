const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const config = require("./index");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createNewUser = async (profile) => {
  const newUser = await new User({
    username: profile.displayName.replace(/\s+/g, "").toLowerCase(),
    email: profile.emails[0].value,
    googleId: profile.id,
    avatar: profile.photos[0].value,
    firstName: profile.name.givenName || null,
    lastName: profile.name.familyName || null,
    isVerified: true,
  }).save();

  console.log("New user created: ", newUser);
  return newUser;
};

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackUrl,
    },
    // callback for google strategy
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        // create new user
        const newUser = await createNewUser(profile);
        return done(null, newUser);
      } catch (error) {
        console.error(`Error during Google authentication: ${error}`);
        return done(error, null);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        if (isMatch) {
          return done(null, user);
        } else {
          return done("Incorrect username or password", null);
        }
      } catch (error) {
        console.error(`Error during Local authentication: ${error}`);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});
