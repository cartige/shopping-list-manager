const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const argon2 = require("argon2");
const User = require("../models/UserManager");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (formEmail, formPassword, done) => {
      console.log("ici");
      try {
        const userVerified = await User.getUserByEmail(formEmail);
        console.log("bon");
        console.log(userVerified);
        if (!userVerified) return done(null, false, { msg: "Wrong username!" });

        const { dataValues: user } = userVerified;
        const isPasswordOK = await argon2.verify(user.password, formPassword);

        if (!isPasswordOK) return done(null, false, { msg: "Wrong password!" });

        delete user.password;

        return done(null, user);
      } catch (err) {
        console.warn(err);
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
