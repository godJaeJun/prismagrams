// passport는 인증 관련한 모든 일을 한다. jwt토큰이나 쿠키에서 정보를 가져와 사용자 정보에 저장한다.
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve(__dirname,".env")});
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

passport.use(new Strategy(jwtOptions, verifyUser));

