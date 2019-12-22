import { Strategy, ExtractJwt } from 'passport-jwt';
import config from "../../config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretOrKey
};

export default passport => {
  passport.use(new Strategy(opts, function (jwt_payload, done) {
    // TODO: Find user from database
    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
  }));
}