import type { WeatherModel } from "../Models/WeatherModel";
import { appConfig } from "../Utils/AppConfig";
import axios from "axios";

class WeatherService {
  public async getWeather(city: string, country: string) {
    try {
      const response = await axios.get<WeatherModel>(
        `${appConfig.getWeather}?city=${encodeURIComponent(
          city
        )}&country=${encodeURIComponent(country)}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  }
}

export const weatherService = new WeatherService();
