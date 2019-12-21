import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import CsrfMiddleware from "./middlewares/csrfMidlleware";
import passport from "passport";
import verifyJWT from "./middlewares/passport";

const middleware = app => {
  // adding security fixes
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(helmet.noCache({ noEtag: true })); // set Cache-Control header
  app.use(helmet.noSniff()); // set X-Content-Type-Options header
  app.use(helmet.frameguard()); // set X-Frame-Options header
  app.use(helmet.xssFilter()); // set X-XSS-Protection header
  app.enable("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
  app.use(CsrfMiddleware);
  app.use(passport.initialize());
  verifyJWT(passport);
};

export default middleware;