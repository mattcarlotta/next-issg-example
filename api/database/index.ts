import bluebird from "bluebird";
import mongoose from "mongoose";
import { logErrorMessage, logInfoMessage } from "~logger";

const { DATABASE } = process.env; // NODE_ENV
// const inTesting = NODE_ENV === "test";

const options = {
  useNewUrlParser: true, // avoids DeprecationWarning: current URL string parser is deprecated
  useCreateIndex: true, // avoids DeprecationWarning: collection.ensureIndex is deprecated.
  useFindAndModify: false, // avoids DeprecationWarning: collection.findAndModify is deprecated.
  useUnifiedTopology: true, // avoids DeprecationWarning: current Server Discovery and Monitoring engine is deprecated
};

mongoose.Promise = bluebird;

export const connectDatabase = () =>
  mongoose.createConnection(`mongodb://localhost/${DATABASE}`, options);

export const connectToDB = () =>
  mongoose.connect(`mongodb://localhost/${DATABASE}`, options);

// if (!inTesting) {
mongoose.connection.on(
  "connected",
  () => logInfoMessage(`Connected to ${DATABASE}`), // log mongodb connection established
);

mongoose.connection.on(
  "disconnected",
  () => logInfoMessage(`Disconnected from ${DATABASE}`), // log mongodb connection disconnected
);

mongoose.connection.on(
  "error",
  () => logErrorMessage(`Connection error to ${DATABASE}`), // log mongodb connection error
);

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    logInfoMessage(`Connection was manually terminated from ${DATABASE}`);
    process.exit(0);
  });
});
// }
