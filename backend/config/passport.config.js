const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require("./index");
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackUrl,
    },
    // callback for google strategy
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        done(null, existingUser);
      } else {
        const newUser = await new User({
          username: profile.displayName.replace(/\s+/g, "").toLowerCase(),
          email: profile.emails[0].value,
          googleId: profile.id,
          avatar: profile.photos[0].value,
          firstName: profile.name.givenName || null,
          lastName: profile.name.familyName || null,
          isVerified: true,
        }).save();
        console.log(`New user created: ${newUser}`);
        done(null, newUser);
      }
    }
  )
);
