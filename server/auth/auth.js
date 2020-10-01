const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.SECRET_OR_KEY,
      jwtFromRequest: ExtractJWT.fromHeader('authorization')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
