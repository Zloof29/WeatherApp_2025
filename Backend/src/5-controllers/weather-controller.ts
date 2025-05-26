import express, { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { error } from "console";
import { weatherService } from "../4-services/weather-service";

class WeatherController {
  public readonly router = express.Router();

  public constructor() {
    this.router.get("/weather", this.weather);
  }

  private async weather(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const city = request.query.city as string;
      const country = request.query.country as string;
      if (!city || !country) {
        return response
          .status(StatusCode.BadRequest)
          .json({ error: "City and country are requires." });
      }

      const weatherData = await weatherService.getWeather(city, country);
      return response.json(weatherData);
    } catch (error: any) {
      next(error);
    }
  }
}

export const weatherController = new WeatherController();
