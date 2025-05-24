import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import fs from "fs";
import helmet from "helmet";
import https from "https";
import path from "path";
import { fileSaver } from "uploaded-file-saver";
import { appConfig } from "./2-utils/app-config";
import { productController } from "./5-controllers/weather-controller";
import { userController } from "./5-controllers/user-controller";
import { errorsMiddleware } from "./6-middleware/errors-middleware";
import { securityMiddleware } from "./6-middleware/security-middleware";

fileSaver.config(path.join("__dirname", "1-assets", "images"));

const server = express();

// server.use(expressRateLimit({
//     windowMs: 5000,
//     limit: 3,
// }));

server.use(helmet());

server.use(cors());

server.use(express.json());

server.use(expressFileUpload());

server.use(securityMiddleware.preventXssAttack);

server.use("/api", productController.router, userController.router);

server.use("*", errorsMiddleware.routeNotFound);

server.use(errorsMiddleware.catchAll);

if (appConfig.isDevelopment) {
  server.listen(appConfig.port, () =>
    console.log("Listening on http://localhost:" + appConfig.port)
  );
} else {
  const options = {
    cert: fs.readFileSync(
      path.join("__dirname", "1-assets", "cert", "localhost_3000.crt")
    ),
    key: fs.readFileSync(
      path.join(
        "__dirname",
        "1-assets",
        "cert",
        "localhost_3000-privateKey.key"
      )
    ),
  };
  const httpsServer = https.createServer(options, server);
  httpsServer.listen(appConfig.port, () =>
    console.log("Listening on https://localhost:" + appConfig.port)
  );
}
