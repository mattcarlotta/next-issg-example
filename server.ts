import "~env";
import "~database";
import next from "next";
import express from "express";
import openBrowser from "react-dev-utils/openBrowser";
import middlewares from "~middlewares";
import routes from "~routes";
import { logInfoMessage, logErrorMessage } from "~logger";
import { Request, Response } from "~types";

const { LOCALHOST, PORT, NODE_ENV } = process.env;

const dev = NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();

    middlewares(server);

    server.use("/api", routes);

    server.all(
      "*",
      (req: Request, res: Response): Promise<void> => handle(req, res),
    );

    server.listen(PORT, (err?: Error) => {
      if (err) throw err;
      logInfoMessage(
        `\nYour application is running on \x1b[1m${LOCALHOST}\x1b[0m\n`,
      );
      openBrowser(String(LOCALHOST));
    });
  } catch (err) {
    logErrorMessage(err.toString());
    process.exit(1);
  }
})();
