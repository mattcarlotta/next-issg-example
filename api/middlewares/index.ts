import { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";

const { NODE_ENV } = process.env;
const inTesting = NODE_ENV === "test";
const inProduction = NODE_ENV === "production";

const middlewares = (app: Express) => {
  if (!inTesting) {
    app.use(
      morgan(
        inProduction
          ? ":remote-addr [:date] :referrer :method :url HTTP/:http-version :status :res[content-length]"
          : "tiny",
      ),
    );
  } // logging framework
  app.use(
    compression({
      level: 6, // set compression level from 1 to 9 (6 by default)
      filter: (req, res) =>
        req.headers["x-no-compression"] ? false : compression.filter(req, res), // set predicate to determine whether to compress
    }),
  );
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  // app.use(passport.initialize()); // initialize passport routes to accept req/res/next
  app.set("json spaces", 2); // sets JSON spaces for clarity
};

export default middlewares;
