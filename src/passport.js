// passport는 인증 관련한 모든 일을 한다. jwt토큰이나 쿠키에서 정보를 가져와 사용자 정보에 저장한다.
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

// user찾기
const verifyUser = async (payload, done) => {
    try {
      const user = await prisma.user({ id: payload.id });
      if (user !== null) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  };

  export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();

