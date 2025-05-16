import { Request, Response, NextFunction } from "express";

class LogsMiddleware {
  public logRequest(request: Request, response: Response, next: NextFunction) {
    console.log("Method: " + request.method);
    console.log("URL: " + request.originalUrl);
    console.log("Body: ", request.body);
    console.log("-----------------------------");
    next();
  }
}

export const logsMiddleware = new LogsMiddleware();
