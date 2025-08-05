import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";
import UsersDataModel from "@/models/client/usersManager.model";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    const user = await UsersDataModel.find("id", jwt_payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

export default passport;
