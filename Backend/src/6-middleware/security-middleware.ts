import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { cyber } from "../2-utils/cyber";
import { UnauthorizedError } from "../3-models/client-error";

class SecurityMiddleware {
  public preventXssAttack(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    for (const prop in request.body) {
      const value = request.body[prop];
      if (typeof value === "string" && value.includes("<script")) {
        response.status(StatusCode.Forbidden).send("Nice try!");
        return;
      }
    }

    next();
  }

  public validateLogin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authorizationHeader = request.headers.authorization;

    const token = authorizationHeader?.substring(7);

    const isValid = cyber.isTokenValid(token);

    if (!isValid) {
      next(new UnauthorizedError("You are not logged in."));
    } else {
      next();
    }
  }

  public validateAdmin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const authorizationHeader = request.headers.authorization;

    const token = authorizationHeader?.substring(7);

    const isValid = cyber.isTokenValid(token);

    if (!isValid) {
      next(new UnauthorizedError("You are not logged in."));
      return;
    }

    const isAdmin = cyber.isAdmin(token);

    if (!isAdmin) {
      next(new UnauthorizedError("You are not authorized."));
      return;
    }

    next();
  }
}

export const securityMiddleware = new SecurityMiddleware();
