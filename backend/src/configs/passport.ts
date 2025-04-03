import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import passport from 'passport';
import { User } from '../models';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  id: string;
}

interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || '',
};

passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done) => {
    try {
      const user = await User.findByPk(payload.id);
      if (user) {
        const userPayload: UserPayload = {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
        return done(null, userPayload);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  }),
);

export default passport;
